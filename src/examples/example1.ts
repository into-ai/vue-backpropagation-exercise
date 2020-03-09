import { Example } from "../interfaces";
import {
  errorFunction,
  powFunc,
  addFunc,
  multFunc,
  leafFunc
} from "../neurons";

const example: Example = {
  errorHandler: errorFunction,
  netFuncTex: `
  \\begin{aligned}
    &n(w_0, x_0, w_1, x_1, b) \\\\
  = &(w_0\\cdot x_0 + w_1\\cdot x_1 + b)^2
  \\end{aligned}`,

  errFuncTex: `
\\begin{aligned}
    &C(w_0, x_0, w_1, x_1, b, e) \\\\
  = &(n(w_0, x_0, w_1, x_1, b) - e)^2
\\end{aligned}`,
  netTree: {
    func: "x^2",
    nodeId: 0,
    bpValue: 1,
    accumulate: powFunc,
    children: [
      {
        func: "+",
        nodeId: 1,
        accumulate: addFunc,
        children: [
          {
            func: "+",
            nodeId: 2,
            accumulate: addFunc,
            children: [
              { func: "b", nodeId: 3, ffValue: 2.4, accumulate: leafFunc },
              {
                func: "\\cdot",
                nodeId: 4,
                accumulate: multFunc,
                children: [
                  {
                    func: "w_1",
                    nodeId: 5,
                    ffValue: 3.4,
                    accumulate: leafFunc
                  },
                  {
                    func: "x_1",
                    nodeId: 6,
                    ffValue: 1.2,
                    accumulate: leafFunc
                  }
                ]
              }
            ]
          },
          {
            func: "\\cdot",
            nodeId: 7,
            accumulate: multFunc,
            children: [
              {
                func: "w_0",
                nodeId: 8,
                ffValue: 1.4,
                accumulate: leafFunc
              },
              {
                func: "x_0",
                nodeId: 9,
                ffValue: 2.4,
                accumulate: leafFunc
              }
            ]
          }
        ]
      }
    ]
  }
};

export default example;
