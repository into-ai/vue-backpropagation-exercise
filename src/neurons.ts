export const powFunc = (c: number[]): number => {
  if (c.length != 1) {
    throw new TypeError(
      `Pow can only handle exactle one input (not ${c.length})`
    );
  }
  return Math.pow(c[0], 2);
};

export const errorFunction = (observed: number, expected: number): number => {
  // observed and expected have been rounded to errorPrecisionDigits digits
  // the return value will also be rounded to errorPrecisionDigits digits
  return Math.pow(observed - expected, 2);
};

export const addFunc = (c: number[]): number => {
  return c.reduce((acc, elem) => acc + elem, 0);
};

export const multFunc = (c: number[]): number => {
  return c.reduce((acc, elem) => acc * elem, 1);
};

export const leafFunc = (): number => {
  return NaN;
};
