<template>
  <div id="app">
    <vue-backpropagation-exercise
      :data="netTree"
      :func="netFuncTex"
      :errFunc="errFuncTex"
      :netErrorHandler="errorFunction"
      :debug="false"
      :submissionValidator="handleSubmit"
      editable="w_1"
      lang="en"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VueBackpropagationExercise, {
  BackpropGraph
} from "./components/VueBackpropagationExercise.vue";

@Component({
  components: {
    VueBackpropagationExercise
  }
})
export default class App extends Vue {
  protected netFuncTex = `
  \\begin{aligned}
    &n(w_0, x_0, w_1, x_1, b) \\\\
  = &(w_0\\cdot x_0 + w_1\\cdot x_1 + b)^2
  \\end{aligned}`;

  protected errFuncTex = `
\\begin{aligned}
    &C(w_0, x_0, w_1, x_1, b, e) \\\\
  = &(n(w_0, x_0, w_1, x_1, b) - e)^2
\\end{aligned}`;

  powFunc(c: number[]): number {
    if (c.length != 1) {
      throw new TypeError(
        `Pow can only handle exactle one input (not ${c.length})`
      );
    }
    return Math.pow(c[0], 2);
  }

  addFunc(c: number[]): number {
    return c.reduce((acc, elem) => acc + elem, 0);
  }

  multFunc(c: number[]): number {
    return c.reduce((acc, elem) => acc * elem, 1);
  }

  leafFunc(): number {
    return NaN;
  }

  errorFunction(observed: number, expected: number): number {
    // observed and expected have been rounded to two digits
    // the return value will also be rounded to 2 digits
    return Math.pow(observed - expected, 2);
  }

  handleSubmit(values: {
    [key: string]: number;
  }): { valid: boolean; message?: string } {
    console.log(values);
    return { valid: true };
  }

  protected netTree: BackpropGraph = {
    func: "x^2",
    nodeId: 0,
    bpValue: 1,
    accumulate: this.powFunc,
    children: [
      {
        func: "+",
        nodeId: 1,
        accumulate: this.addFunc,
        children: [
          {
            func: "+",
            nodeId: 2,
            accumulate: this.addFunc,
            children: [
              { func: "b", nodeId: 3, ffValue: 2.4, accumulate: this.leafFunc },
              {
                func: "\\cdot",
                nodeId: 4,
                accumulate: this.multFunc,
                children: [
                  {
                    func: "w_1",
                    nodeId: 5,
                    ffValue: 3.4,
                    accumulate: this.leafFunc
                  },
                  {
                    func: "x_1",
                    nodeId: 6,
                    ffValue: 1.2,
                    accumulate: this.leafFunc
                  }
                ]
              }
            ]
          },
          {
            func: "\\cdot",
            nodeId: 7,
            accumulate: this.multFunc,
            children: [
              {
                func: "w_0",
                nodeId: 8,
                ffValue: 1.4,
                accumulate: this.leafFunc
              },
              {
                func: "x_0",
                nodeId: 9,
                ffValue: 2.4,
                accumulate: this.leafFunc
              }
            ]
          }
        ]
      }
    ]
  };
}
</script>

<style lang="sass">
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  font-size: 1em
  text-align: center
  color: #2c3e50
  margin: 60px 0
</style>
