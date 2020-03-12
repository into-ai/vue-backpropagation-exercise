<template>
  <div class="backpropexercise">
    <div class="top-controls controls">
      <p class="important">
        {{ tl("tip") }}
      </p>
      <table class="net-functions">
        <tr>
          <td>{{ tl("netFunction") }}</td>
          <td>{{ tl("errFunction") }}</td>
        </tr>
        <tr>
          <td><div id="net-function" class="net-function"></div></td>
          <td><div id="err-function" class="net-function"></div></td>
        </tr>
      </table>

      <ul class="legend" @click="toggleStep(currentStep)">
        <li :class="{ 'inactive-step': this.currentStep == 'BP' }">
          <span class="ff bubble"></span> Feedforward {{ tl("step") }}
        </li>
        <li :class="{ 'inactive-step': this.currentStep != 'BP' }">
          <span class="bp bubble"></span> Backpropagation {{ tl("step") }}
        </li>
      </ul>
    </div>
    <div class="computation-graph"></div>
    <div class="bottom-controls controls">
      <div v-if="debug == true">
        <span class="debug-button" @click="feedforward(root)"
          >Debug: Add FF</span
        >
        <span class="debug-button" @click="backpropagation()"
          >Debug: Add BP</span
        >
      </div>
      <div>
        <div v-show="this.currentStep === 'WOW'" class="weight-slider-controls">
          <p v-html="wowInstructions"></p>
          <p>
            <label for="points"
              >{{ tl("change") }} <span class="editable-weight"></span>:
            </label>
            <input
              type="range"
              id="weight-slider-input"
              name="weight"
              min="-100"
              max="100"
              v-model="weightSliderValue"
            />
            <span
              class="weight-change"
              :class="[weightChange.value >= 0 ? 'positive' : 'negative']"
            >
              {{ weightChange.formatted }}
            </span>
          </p>
          <p>
            {{ tl("change") }} <span class="editable-weight"></span>
            {{ tl("to") }} {{ newEditableWeightValue.toFixed(2) }} (<span
              class="weight-change"
              :class="[weightChange.value >= 0 ? 'positive' : 'negative']"
              >{{ weightChange.formatted }}</span
            >) {{ tl("yieldsError") }}
            {{ totalNetError.toFixed(errorPrecisionDigits) }} (<span
              class="weight-change"
              :class="[costChange.value >= 0 ? 'positive' : 'negative']"
              >{{ costChange.formatted }}</span
            >)
          </p>
        </div>
      </div>
      <span
        v-if="this.currentStep != 'WOW'"
        class="proceed-button"
        :class="{
          disabled: submitted,
          submit: currentStep === 'BP' && !submitted
        }"
        @click="proceed"
      >
        {{ proceedButtonText }}
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import * as d3 from "d3";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import katex from "katex";
import { diagonal, linePointAt } from "@/geometry";
import {
  formatString,
  round2d,
  roundNd,
  fixedNd,
  parseFloatStrict
} from "@/utils";
import { detect } from "detect-browser";
import { translations } from "@/translations";
import { Point, BackpropGraph, Language, Step } from "@/interfaces";
export * from "@/interfaces";
export { round2d, fixedNd } from "@/utils";

declare global {
  interface Window {
    checkUserNumberInput: (input: HTMLInputElement) => void;
  }
}

const defaultErrFunc = `
\\begin{aligned}
    &C(w_0, x_0, w_1, x_1, b, e) \\\\
  = &(n(w_0, x_0, w_1, x_1, b) - e)^2
\\end{aligned}`;

const defaultErrorFunction = (observed: number, expected: number): number => {
  return round2d(Math.pow(round2d(observed) - round2d(expected), 2));
};

@Component
export default class VueBackpropagationExercise extends Vue {
  @Prop() private data!: BackpropGraph;
  @Prop() private func!: string;
  @Prop() private editable!: string;
  @Prop() private debug?: boolean;
  @Prop({ default: Language.EN }) private lang!: Language | string;
  @Prop() private submissionValidator!: (
    result: {
      [key: string]: number;
    },
    expected: {
      [key: string]: number;
    },
    valid?: boolean
  ) => { valid: boolean; message?: string };
  @Prop({ default: () => defaultErrorFunction }) protected netErrorHandler!: (
    observed: number,
    expected: number
  ) => number;
  @Prop({ default: 5 }) protected errorPrecisionDigits!: number;
  @Prop({ default: 500 }) protected width!: number;
  @Prop({ default: 300 }) protected height!: number;
  @Prop({ default: 600 }) protected animationDuration!: number;
  @Prop({ default: 0.4 }) protected animationPreshootFactor!: number;
  @Prop({ default: 100 }) protected padding!: number;
  @Prop({ default: 0.5 }) protected weightSliderRelativeRange!: number;
  @Prop({ default: 50 }) protected expectedOut!: number;
  @Prop({ default: defaultErrFunc }) private errorFunc!: string;
  @Prop({ default: 15 }) protected circleRadius!: number;
  @Prop({ default: "#4a47a3" }) protected circleColor!: string;
  @Prop({ default: "#413c69" }) protected circleOutlineColor!: string;
  @Prop({ default: "#c9485b" }) protected redColor!: string;
  @Prop({ default: "#8cba51" }) protected greenColor!: string;
  @Prop({ default: "#ccc" }) protected arrowColor!: string;
  @Prop({ default: 7 }) protected arrowSize!: number;

  protected weightSliderValue = 0;
  protected newEditableWeightValue = 0.5;
  protected ffOverrides: { [key: string]: number } = {};

  protected netErrorCausedValue = 0.5;
  protected totalNetError = 0;
  protected initialNetError = 0;
  protected submitted = false;

  protected treeData: BackpropGraph;
  protected tree: d3.TreeLayout<BackpropGraph>;
  protected svg: d3.Selection<SVGSVGElement, BackpropGraph, HTMLElement, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  protected root: d3.HierarchyPointNode<BackpropGraph>;
  protected treeMap: d3.HierarchyPointNode<BackpropGraph>;
  protected nodes: d3.HierarchyPointNode<BackpropGraph>[];
  protected links: d3.HierarchyPointNode<BackpropGraph>[];

  protected currentStep: Step = Step.FF;

  @Watch("weightSliderValue")
  onWeightSliderValue(val: string) {
    const changes = this.links
      .filter(d => d.data.func === this.editable)
      .map(d => {
        const ffInput = document.getElementById(
          this.inputId(d, Step.FF)
        ) as HTMLInputElement;
        if (ffInput != null && ffInput != undefined) {
          const parsedValue = parseFloatStrict(val.replace(",", "."));
          if (!isNaN(parsedValue)) {
            ffInput.disabled = true;
            const newValue = round2d(
              round2d(d.data.ffValue ?? 0) +
                this.weightSliderRelativeRange *
                  round2d(d.data.ffValue ?? 0) *
                  (round2d(parsedValue) / 100)
            );
            ffInput.value = newValue.toString();
            d.data.currentFFValue = newValue;
            const netOut = this.feedforward(this.root).out;
            this.updateError(netOut, this.expectedOut);
            return newValue;
          }
        }
        return NaN;
      });
    this.newEditableWeightValue = changes[0];
  }

  tl(key: string): string {
    return (
      translations[key].get((this.lang ?? Language.EN) as Language) ??
      "<missing translation>"
    );
  }

  get wowInstructions(): string {
    const mathEditableHtml = katex.renderToString(this.editable, {
      throwOnError: false
    });
    return formatString(this.tl("wowinstructions"), mathEditableHtml);
  }

  get weightChange(): { value: number; formatted: string } {
    return {
      value: this.weightSliderValue * this.weightSliderRelativeRange,
      formatted: `${this.weightSliderValue >= 0 ? "+" : "-"}${fixedNd(
        Math.abs(this.weightSliderValue * this.weightSliderRelativeRange),
        2,
        0
      )}%`
    };
  }

  get costChange(): { value: number; formatted: string } {
    const costChangePercent =
      (1 -
        this.initialNetError /
          Math.max(
            this.totalNetError,
            1.0 / Math.pow(10, this.errorPrecisionDigits)
          )) *
      100;
    return {
      value: costChangePercent,
      formatted: `${costChangePercent >= 0 ? "+" : ""}${round2d(
        costChangePercent
      ).toFixed(0)}%`
    };
  }

  get proceedButtonText(): string {
    return this.submitted
      ? this.tl("submitted")
      : this.currentStep === Step.FF
      ? this.tl("nextStep")
      : this.tl("submit");
  }

  public constructor() {
    super();
    this.treeData = {
      func: "",
      nodeId: -1,
      accumulate: (c: number[]): number => {
        return c.reduce((acc, elem) => acc + elem, 0);
      },
      bpValue: 1,
      children: [this.data]
    };
    this.tree = d3.tree<BackpropGraph>().size([this.height, this.width]);
    const root = d3.hierarchy(this.treeData, d => {
      return d.children;
    });
    this.svg = d3.select<SVGSVGElement, BackpropGraph>("div.computation-graph");
    this.treeMap = this.tree(root);
    this.nodes = this.treeMap.descendants();
    this.root = this.nodes[0];
    this.links = this.treeMap.descendants().slice(1);
    this.links.forEach(d => {
      if (d.data?.ffValue != undefined)
        this.ffOverrides[this.inputId(d, Step.FF)] = d.data?.ffValue;
    });

    this.initialNetError = roundNd(
      this.netErrorHandler(
        roundNd(
          this.feedforward(this.root, undefined, true).out,
          this.errorPrecisionDigits
        ),
        roundNd(this.expectedOut, this.errorPrecisionDigits)
      ),
      this.errorPrecisionDigits
    );
  }

  inputId(d: d3.HierarchyPointNode<BackpropGraph>, step: Step) {
    return `${step === Step.FF ? "ff" : "bp"}_${d.data.nodeId}_to_${d.parent
      ?.data?.nodeId ?? "undefined"}`;
  }

  validFFInputValues(): boolean {
    // Check against FF
    const correct = this.feedforward(this.root, undefined, true).acc;

    // Check there are no empty values
    const invalid: string[] = [];
    const wrong: { id: string; value: string }[] = [];
    // Tolerance is dangerous as we do not know how this will affect following neurons
    // Infering erros from the neurons inverse depth is also bad because some neuron functions have more impact than others
    // Allowing for some tolerance would require to perform the FF step using the users values
    const tolerance = 0;

    this.links.forEach(d => {
      const inputId = this.inputId(d, Step.FF);
      const ffInput = document.getElementById(inputId) as HTMLInputElement;
      if (
        d.data.ffValue === undefined &&
        ffInput != null &&
        ffInput != undefined
      ) {
        if (ffInput.value.length < 1) {
          invalid.push(inputId);
        } else if (
          Math.abs(parseFloatStrict(ffInput.value) - correct[inputId]) >
          tolerance
        ) {
          wrong.push({ id: inputId, value: ffInput.value });
        }
      }
    });
    if (invalid.length > 0) {
      alert(formatString(this.tl("missingValues"), invalid.length.toString()));
      return false;
    }
    if (wrong.length > 0) {
      alert(
        formatString(
          this.tl("wrongFFValue"),
          wrong.length.toString(),
          wrong[wrong.length - 1].value.toString()
        )
      );
      return false;
    }
    return true;
  }

  validBPInputValues(): boolean {
    // Check there are no empty values
    const invalid: string[] = [];
    this.links.forEach(d => {
      const inputId = this.inputId(d, Step.BP);
      const bpInput = document.getElementById(inputId) as HTMLInputElement;
      if (
        d.data.bpValue === undefined &&
        bpInput != null &&
        bpInput != undefined
      ) {
        if (bpInput.value.length < 1) invalid.push(inputId);
      }
    });
    if (invalid.length > 0) {
      alert(formatString(this.tl("missingValues"), invalid.length.toString()));
      return false;
    }
    return true;
  }

  collectBPInputValues(): { [key: string]: number } {
    const values: { [key: string]: number } = {};
    this.links.forEach(d => {
      const inputId = this.inputId(d, Step.BP);
      const bpInput = document.getElementById(inputId) as HTMLInputElement;
      if (
        d.data.bpValue === undefined &&
        bpInput != null &&
        bpInput != undefined
      ) {
        values[inputId] = parseFloatStrict(bpInput.value);
      }
    });
    return values;
  }

  proceed(): void {
    if (this.submitted) return;

    if (this.currentStep == Step.FF) {
      if (!this.validFFInputValues()) return;
      this.toggleStep(Step.BP);
      this.currentStep = Step.BP;
      const netOut = this.feedforward(this.root).out;
      this.updateError(netOut, this.expectedOut);
    } else if (this.currentStep == Step.BP) {
      if (!this.validBPInputValues()) return;

      const result = this.collectBPInputValues();
      const expected = this.backpropagation(true);
      // Automatic validation based on derivatives if available
      let valid: boolean | undefined;
      if (result.length == expected.length) {
        valid = JSON.stringify(result) === JSON.stringify(expected);
      }
      const validation = this.submissionValidator(result, expected, valid);
      alert(this.tl("thanks"));

      if (validation.valid) {
        // Do not proceed to the WOW stage with wrong values and dont send secret
        alert(`${this.tl("resultSuccess")}\n${validation.message ?? ""}`);
        this.submitted = true;

        alert(this.tl("whywow"));
        this.toggleStep(Step.WOW);
        this.currentStep = Step.WOW;
      } else {
        alert(this.tl("resultError"));
      }
    }
  }

  mounted() {
    // Check if browser is supported
    const browser = detect();
    switch (browser && browser.name) {
      case "chrome":
      case "opera":
      case "firefox":
        break;
      default:
        alert(
          formatString(this.tl("unsupportedBrowser"), browser?.name ?? "?")
        );
    }

    // Render the net and error functions
    const netFuncElement = document.getElementById("net-function");
    if (netFuncElement != null)
      katex.render(this.func, netFuncElement, {
        throwOnError: false
      });

    const errFuncElement = document.getElementById("err-function");
    if (errFuncElement != null)
      katex.render(this.errorFunc, errFuncElement, {
        throwOnError: false
      });

    window.checkUserNumberInput = (input: HTMLInputElement): void => {
      const enteredValue = input.value;
      if (
        enteredValue != undefined &&
        enteredValue != null &&
        enteredValue.length > 0
      ) {
        const parsedValue = parseFloatStrict(enteredValue.replace(",", "."));
        if (isNaN(parsedValue)) {
          alert(formatString(this.tl("invalidNumber"), enteredValue));
          input.value = "";
          return;
        }
        const roundedValue = round2d(parsedValue);
        input.value = roundedValue.toFixed(2);
      }
    };

    this.svg = d3
      .select<d3.BaseType, BackpropGraph>("div.computation-graph")
      .append("svg")
      .attr(
        "viewBox",
        `-${this.padding} 0 ${this.width + 1.5 * this.padding} ${this.height}`
      )
      .style("font-size", "0.5rem");

    this.svg
      .append("defs")
      .selectAll("marker")
      .data(["resolved"])
      .join("marker")
      .attr("id", d => `arrow-${d}`)
      .attr("viewBox", `0 -5 10 10`)
      .attr("refX", `${this.arrowSize + Math.round(this.circleRadius / 2) + 1}`)
      .attr("refY", "0px")
      .attr("markerWidth", `${this.arrowSize}`)
      .attr("markerHeight", `${this.arrowSize}`)
      .append("path")
      .attr("fill", this.arrowColor)
      .attr("d", "M0,-5L10,0L0,5");

    this.build(this.root);
  }

  toggleInputsForStep(step: Step): void {
    this.links.forEach(d => {
      const ffInput = document.getElementById(
        this.inputId(d, Step.FF)
      ) as HTMLInputElement;
      const bpInput = document.getElementById(
        this.inputId(d, Step.BP)
      ) as HTMLInputElement;
      if (
        d.data.ffValue === undefined &&
        ffInput != null &&
        ffInput != undefined
      ) {
        ffInput.style["border"] =
          step != Step.FF ? "none" : `1px solid ${this.greenColor}`;
        ffInput.disabled = step != Step.FF;
      }
      if (bpInput != null && bpInput != undefined) {
        if (d.data.bpValue === undefined) {
          bpInput.disabled = step != Step.BP;
          bpInput.style["border"] =
            step != Step.BP ? "none" : `1px solid ${this.redColor}`;
        }
        bpInput.hidden = step != Step.BP;
      }
    });
  }

  orientForStep(step: Step): number {
    return step === Step.BP ? 180 : 0;
  }

  toggleArrowsForStep(step: Step): void {
    this.svg.selectAll("defs marker").attr("orient", this.orientForStep(step));

    if (step == Step.FF)
      this.svg
        .selectAll("path.link")
        .attr(
          "marker-end",
          `url(${new URL(`#arrow-resolved`, window.location.href)})`
        )
        .attr("marker-start", "none");

    if (step == Step.BP)
      this.svg
        .selectAll("path.link")
        .attr("marker-end", "none")
        .attr(
          "marker-start",
          `url(${new URL(`#arrow-resolved`, window.location.href)})`
        );
  }

  feedforward(
    d: d3.HierarchyPointNode<BackpropGraph>,
    acc?: { [key: string]: number },
    quiet?: boolean
  ): { out: number; acc: { [key: string]: number } } {
    if (acc == undefined) {
      acc = {}; // Base case
    }
    const ffInputValues: number[] = (d?.children ?? []).map(c => {
      if (c.data?.currentFFValue != undefined)
        return round2d(c.data?.currentFFValue);
      if (c.data?.ffValue != undefined) return round2d(c.data?.ffValue);
      return this.feedforward(c, acc, quiet).out;
    });
    const ffValue = round2d(d.data.accumulate(ffInputValues));
    if (d.parent) {
      const key = this.inputId(d, Step.FF);
      acc[key] = ffValue;
      if (!(quiet === true)) {
        const ffInput = document.getElementById(key) as HTMLInputElement;
        if (ffInput != null && ffInput != undefined) {
          // Make bold
          ffInput.style.setProperty(
            "font-weight",
            parseFloatStrict(ffInput.value) !== ffValue ? "bold" : "normal"
          );
          ffInput.value = ffValue.toString();
        }
      }
    }
    return {
      out: ffValue,
      acc: acc
    };
  }

  backpropagation(quiet?: boolean): Record<string, number> {
    const expectedValues: { [key: string]: number } = {};

    this.links.forEach(d => {
      const inputBpId = this.inputId(d, Step.BP);
      const inputFfId = this.inputId(d, Step.FF);
      const ffInput = document.getElementById(inputFfId) as HTMLInputElement;
      const bpInput = document.getElementById(inputBpId) as HTMLInputElement;
      let siblingFfValue = 1;

      if (
        d.parent &&
        (expectedValues[this.inputId(d.parent, Step.BP)] != undefined ||
          d.parent.data.bpValue != undefined)
      ) {
        const parentInputId = this.inputId(d.parent, Step.BP);
        const parentBpInput = document.getElementById(
          parentInputId
        ) as HTMLInputElement;
        let parentBpValue: number;

        parentBpInput != null
          ? (parentBpValue = +parentBpInput.value)
          : (parentBpValue = 1);

        d.parent.children?.forEach(child => {
          if (child.data.nodeId != d.data.nodeId) {
            const sibling = document.getElementById(
              `ff_${child.data.nodeId}_to_${child.parent?.data.nodeId}`
            ) as HTMLInputElement;
            siblingFfValue = +sibling.value;
          }
        });

        const inputValues: Record<string, number> = {
          ff: +ffInput.value,
          parentBp: parentBpValue,
          siblingFf: siblingFfValue
        };

        if (d.parent.data.derivative) {
          const correct = d.parent.data.derivative(inputValues);
          if (!(quiet === true)) bpInput.value = correct.toString();
          expectedValues[inputBpId] = correct;
        }
      }
    });

    return expectedValues;
  }

  updateError(observed: number, expected: number): void {
    const netOut = round2d(observed);
    const expectedOut = round2d(expected);
    this.totalNetError = roundNd(
      this.netErrorHandler(
        roundNd(netOut, this.errorPrecisionDigits),
        roundNd(expectedOut, this.errorPrecisionDigits)
      ),
      this.errorPrecisionDigits
    );
    const totalErrorText = document.getElementById("net_error") as HTMLElement;
    if (totalErrorText != undefined && totalErrorText != null) {
      const errorTex = `
\\text{${this.tl("expected")} ${expectedOut}} \\\\ \\\\
\\begin{aligned}
E &= {(${netOut} - ${expectedOut})}^2 \\\\
  &= ${this.totalNetError} \\\\
\\end{aligned}`;
      katex.render(errorTex, totalErrorText, {
        throwOnError: false
      });
    }
  }

  toggleStep(step: Step): void {
    this.toggleInputsForStep(step);
    this.toggleArrowsForStep(step);
    const texPlaceholders: HTMLCollectionOf<Element> = document.getElementsByClassName(
      "editable-weight"
    );
    for (let i = 0; i < texPlaceholders.length; i++) {
      katex.render(this.editable, texPlaceholders[i] as HTMLElement, {
        throwOnError: false
      });
    }
  }

  centeredChildPoint(d: d3.HierarchyPointNode<BackpropGraph>): Point {
    const maxChildX = (
      children: d3.HierarchyPointNode<BackpropGraph>[]
    ): number => {
      return Math.max(...children.map(d => d.y));
    };
    const p =
      d.children && d.children.length > 0
        ? {
            y: maxChildX(d.children),
            x: (d.children[0].x + d.children[d.children.length - 1].x) / 2
          }
        : d;
    return p;
  }

  build(source: d3.HierarchyPointNode<BackpropGraph>) {
    // Normalize for fixed-depth.
    this.nodes.forEach(d => {
      const factorW = this.width / (source.height + 1);
      d.y = (source.height - d.depth) * factorW;
    });

    // ****************** Nodes section ***************************

    //  Update the nodes...
    this.svg.selectAll("g.node").data(this.nodes);

    const circleNodes = this.svg
      .selectAll("g.node")
      .data(this.nodes.filter(dd => dd.depth > 0));

    const lastNode = this.svg
      .selectAll("g.node")
      .data(this.nodes.filter(dd => dd.depth == 0));

    const errorHeight = 50;
    const errorWidth = 50;
    lastNode
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", () => {
        return "translate(" + source.y + "," + source.x + ")";
      })
      .append("foreignObject")
      .attr("class", "externalObject")
      .attr("y", `-${errorHeight / 2}px`)
      .attr("width", `${errorWidth}px`)
      .attr("height", `${errorHeight}px`)
      .style("color", "black")
      .attr("overflow", "visible")
      .html(
        () =>
          `<text style='height: ${errorHeight}px; width: ${errorWidth};' id='net_error'></text>`
      );

    const nodeEnter = circleNodes
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", d => {
        const origin = this.centeredChildPoint(d);
        return "translate(" + origin.y + "," + origin.x + ")";
      });

    nodeEnter
      .append("circle")
      .attr("class", "node")
      .style("stroke", this.circleOutlineColor)
      .style("stroke-width", "2px")
      .attr("r", 1e-6)
      .style("fill", "white");

    nodeEnter
      .append("foreignObject")
      .attr("class", "externalObject")
      .attr("x", `-${this.circleRadius / 2}px`)
      .attr("y", `-${this.circleRadius / 2}px`)
      .attr("width", `${this.circleRadius}px`)
      .attr("height", `${this.circleRadius}px`)
      .style("color", "white")
      .style("font-size", `${this.circleRadius * 0.75}px`)
      .attr("overflow", "visible")
      .html(d => {
        const mathFuncHtml = katex.renderToString(d.data.func, {
          throwOnError: false
        });
        return `<div style='height: ${this.circleRadius / 2}; width: ${
          this.circleRadius
        };' id='func_${d.data.nodeId}'>${mathFuncHtml}</div>`;
      });

    const animationDelay = (
      d: d3.HierarchyPointNode<BackpropGraph>
    ): number => {
      return (
        (source.height - d.depth) *
        this.animationDuration *
        this.animationPreshootFactor
      );
    };

    nodeEnter
      .transition()
      .delay(d => animationDelay(d))
      .duration(this.animationDuration)
      .attr("transform", d => {
        return "translate(" + d.y + "," + d.x + ")";
      })
      .select("circle.node")
      .attr("r", this.circleRadius)
      .style("fill", this.circleColor);

    // Update the links...
    const link = this.svg
      .selectAll<d3.BaseType, d3.HierarchyPointNode<BackpropGraph>>("path.link")
      .data(this.links);

    // Enter any new links at the parent's previous position.
    const linkEnter = link
      .enter()
      .insert("path", "g")
      .attr("class", "link")
      .style("fill", "none")
      .style("stroke", "#ccc")
      .style("stroke-width", "2px")
      .style("opacity", 0)
      .attr("d", d => {
        const origin = this.centeredChildPoint(d);
        return diagonal(origin, origin);
      });

    linkEnter
      .transition()
      .delay(d => animationDelay(d))
      .duration(this.animationDuration)
      .style("opacity", 1)
      .attr(
        `marker-${this.currentStep == Step.FF ? "end" : "start"}`,
        () => `url(${new URL(`#arrow-resolved`, window.location.href)})`
      )
      .attr("d", d => {
        return diagonal(d, d.parent ?? d);
      })
      .attr("marker-orient", () => {
        return 10;
      });

    const inputWidth = "2rem";
    const inputHeight = 15;
    const inputPlaceholder = "?";
    const spacing = 5;

    const ffInputsEnter = link
      .enter()
      .insert("foreignObject", "g")
      .attr("class", "externalObject")
      .attr("transform", d => {
        const origin = this.centeredChildPoint(d);
        return "translate(" + origin.y + "," + origin.x + ")";
      })
      .attr("width", inputWidth)
      .attr("overflow", "visible")
      .attr("height", `${inputHeight}px`)
      .style("opacity", 0);

    ffInputsEnter.append("xhtml:div").html(d => {
      const isEditable = d.data.ffValue === undefined;
      const style = `background: transparent; font-size: 0.5rem; height: ${inputHeight}px; width: ${inputWidth}; border: none; padding: 0;`;
      return `<input type='text' onchange=window.checkUserNumberInput(this) ${
        isEditable ? "" : "disabled value=" + d.data.ffValue
      } style='${style}' id='${this.inputId(
        d,
        Step.FF
      )}' placeholder='${inputPlaceholder}'></input>`;
    });

    ffInputsEnter
      .transition()
      .delay(d => animationDelay(d))
      .duration(this.animationDuration)
      .attr("transform", d => {
        const y = linePointAt(d, d.parent ?? d, 0.75).y - inputHeight - spacing;
        const x = linePointAt(d, d.parent ?? d, 0.75).x;
        return "translate(" + x + "," + y + ")";
      })
      .style("opacity", 1);

    link
      .enter()
      .insert("foreignObject", "g")
      .attr("class", "externalObject")
      .attr("width", inputWidth)
      .attr("transform", d => {
        const y = linePointAt(d, d.parent ?? d, 0.75).y + spacing;
        const x = linePointAt(d, d.parent ?? d, 0.75).x;
        return "translate(" + x + "," + y + ")";
      })
      .attr("hidden", true)
      .attr("overflow", "visible")
      .attr("height", `${inputHeight}px`)
      .append("xhtml:div")
      .html(d => {
        const isEditable = d.data.bpValue === undefined;
        const style = `background: transparent; font-size: 0.5rem; height: ${inputHeight}px; width: ${inputWidth}; border: none; padding: 0;`;
        return `<input type='text' onchange=window.checkUserNumberInput(this) disabled ${
          isEditable ? "" : "value=" + d.data.bpValue
        } hidden style='${style}' id='${this.inputId(
          d,
          Step.BP
        )}' placeholder='${inputPlaceholder}'></input>`;
      });

    this.toggleStep(this.currentStep);
  }
}
</script>

<style scoped lang="sass">
@import '~katex/dist/katex.min.css'
$red: #c9485b
$green: #8cba51

.backpropexercise
  display: inline-block
  position: relative
  margin: 0 auto
  width: 100%

  .positive
    color: $green

  .negative
    color: $red

  table.net-functions
    width: 80%
    margin: 0 auto
    td
      padding: 5px

  .important
    font-weight: bold
    background-color: $red
    color: white
    padding: 15px

  ul.legend
    display: inline-block
    margin: 0
    text-align: left
    list-style: none
    li
      float: left
      padding: 10px

      &.inactive-step
        opacity: 0.5

    .bubble
      display: inline-block
      border-radius: 5px
      width: 10px
      height: 10px

    .ff
      background-color: $green

    .bp
      background-color: $red

  .computation-graph
    margin: 0 auto
    border: 2px solid black

  .controls
    padding: 10px 0px

  .bottom-controls
    width: 100%
    padding: 0px
    float: right

    .safe-spaced
      display: inline-block
      text-align: center
      width: 4rem

    &>*
      margin: 10px

    .weight-slider-controls
      text-align: left
      float: left

      .weight-change
        font-weight: normal

  .debug-button
    margin: 10px
    color: white
    display: inline-block
    cursor: pointer
    background-color: purple
    padding: 3px
    border-radius: 3px

  .proceed-button
    display: inline-block
    position: relative
    cursor: pointer
    background-color: #4a47a3
    font-weight: bolder
    float: right
    color: white
    padding: 7px
    margin-right: 0px
    border-radius: 5px

    &.disabled
      cursor: default
      background-color: gray
      &:hover
        background-color: darken(gray, 5%)

    &:hover
      background-color: darken(#4a47a3, 15%)

  .submit
    background-color: $red
    &:hover
      background-color: darken($red, 15%)
</style>

<style lang="sass">
mjx-container[jax="CHTML"][display="true"]
  margin: 0 !important
  padding: 0
  vertical-align: baseline
</style>
