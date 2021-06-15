export interface ICalculationFun {
  (currentNum: number, delta: number): number; // eslint-disable-line
}

export interface IConfig {
  aspect: number;
  blur: number;
  x: number;
  rotate: number;
  handleBlurChange: ICalculationFun;
  handleParallaxChange: ICalculationFun;
}
