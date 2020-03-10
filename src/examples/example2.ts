import { Example } from "../interfaces";
import {
  errorFunction,
  addFunc,
  multFunc,
  leafFunc,
  addFuncDerivative,
  multFuncDerivative
} from "../neurons";

const powThreeQuarterFunc = (c: number[]): number => {
  if (c.length != 1) {
    throw new TypeError(
      `Pow can only handle exactly one input (not ${c.length})`
    );
  }
  return Math.pow(c[0], 0.75);
};

export const powThreeQuarterFuncDerivative = (
  inputValues: Record<string, number>
): number => {
  const result: number =
    (3 / (4 * Math.pow(inputValues.ff, 1 / 4))) * inputValues.parentBp;

  return +result.toFixed(2);
};

const example: Example = {
  errorHandler: errorFunction,
  netFuncTex: `
      \\begin{aligned}
         &n(w_0, w_1, w_2, w_3, w_4, w_5, x_0, x_1, b_0, b_1, b_2) \\\\
      = (&(w_0\\cdot x_0 + w_1\\cdot x_1 + b_0)^{3/4} \\cdot w_4 + \\\\
        &(w_2\\cdot x_0 + w_3\\cdot x_1 + b_1)^{3/4} \\cdot w_5 + b_2)^{3/4}
      \\end{aligned}`,

  errFuncTex: `
    \\begin{aligned}
        &C(w_0, w_1, w_2, w_3, w_4, w_5, x_0, x_1, b_0, b_1, b_2, e) \\\\
      = &(n(w_0, w_1, w_2, w_3, w_4, w_5, x_0, x_1, b_0, b_1, b_2) - e)^2
    \\end{aligned}`,

  netTree: {
    func: "x^{3/4}",
    nodeId: 0,
    bpValue: 1,
    accumulate: powThreeQuarterFunc,
    derivative: powThreeQuarterFuncDerivative,
    children: [
      {
        func: "+",
        nodeId: 1,
        accumulate: addFunc,
        derivative: addFuncDerivative,
        children: [
          {
            func: "+",
            nodeId: 2,
            accumulate: addFunc,
            derivative: addFuncDerivative,
            children: [
              {
                func: "\\cdot",
                nodeId: 3,
                accumulate: multFunc,
                derivative: multFuncDerivative,
                children: [
                  {
                    func: "w_4",
                    nodeId: 4,
                    ffValue: 1.4,
                    accumulate: leafFunc
                  },
                  {
                    func: "x^{3/4}",
                    nodeId: 5,
                    accumulate: powThreeQuarterFunc,
                    derivative: powThreeQuarterFuncDerivative,
                    children: [
                      {
                        func: "+",
                        nodeId: 6,
                        accumulate: addFunc,
                        derivative: addFuncDerivative,
                        children: [
                          {
                            func: "+",
                            nodeId: 7,
                            accumulate: addFunc,
                            derivative: addFuncDerivative,
                            children: [
                              {
                                func: "\\cdot",
                                nodeId: 8,
                                accumulate: multFunc,
                                derivative: multFuncDerivative,
                                children: [
                                  {
                                    func: "w_0",
                                    nodeId: 9,
                                    ffValue: 0.4,
                                    accumulate: leafFunc
                                  },
                                  {
                                    func: "x_0",
                                    nodeId: 10,
                                    ffValue: 5,
                                    accumulate: leafFunc
                                  }
                                ]
                              },
                              {
                                func: "\\cdot",
                                nodeId: 11,
                                accumulate: multFunc,
                                derivative: multFuncDerivative,
                                children: [
                                  {
                                    func: "w_1",
                                    nodeId: 12,
                                    ffValue: 0.6,
                                    accumulate: leafFunc
                                  },
                                  {
                                    func: "x_1",
                                    nodeId: 13,
                                    ffValue: 3,
                                    accumulate: leafFunc
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            func: "b_0",
                            nodeId: 14,
                            ffValue: 0.5,
                            accumulate: leafFunc
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                func: "\\cdot",
                nodeId: 15,
                accumulate: multFunc,
                derivative: multFuncDerivative,
                children: [
                  {
                    func: "w_5",
                    nodeId: 16,
                    ffValue: 0.7,
                    accumulate: leafFunc
                  },
                  {
                    func: "x^{3/4}",
                    nodeId: 17,
                    accumulate: powThreeQuarterFunc,
                    derivative: powThreeQuarterFuncDerivative,
                    children: [
                      {
                        func: "+",
                        nodeId: 18,
                        accumulate: addFunc,
                        derivative: addFuncDerivative,
                        children: [
                          {
                            func: "+",
                            nodeId: 19,
                            accumulate: addFunc,
                            derivative: addFuncDerivative,
                            children: [
                              {
                                func: "\\cdot",
                                nodeId: 20,
                                accumulate: multFunc,
                                derivative: multFuncDerivative,
                                children: [
                                  {
                                    func: "w_2",
                                    nodeId: 21,
                                    ffValue: 1.2,
                                    accumulate: leafFunc
                                  },
                                  {
                                    func: "x_0",
                                    nodeId: 22,
                                    ffValue: 5,
                                    accumulate: leafFunc
                                  }
                                ]
                              },
                              {
                                func: "\\cdot",
                                nodeId: 23,
                                accumulate: multFunc,
                                derivative: multFuncDerivative,
                                children: [
                                  {
                                    func: "w_3",
                                    nodeId: 24,
                                    ffValue: 0.65,
                                    accumulate: leafFunc
                                  },
                                  {
                                    func: "x_1",
                                    nodeId: 25,
                                    ffValue: 3,
                                    accumulate: leafFunc
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            func: "b_1",
                            nodeId: 26,
                            ffValue: 0.5,
                            accumulate: leafFunc
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          { func: "b_2", nodeId: 27, ffValue: 0.5, accumulate: leafFunc }
        ]
      }
    ]
  }
};

export default example;
