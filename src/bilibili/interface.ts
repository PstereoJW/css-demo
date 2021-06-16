export interface ICalculationFun {
  (currentNum: number, delta: number): number; // eslint-disable-line
}

export interface IConfig {
  scale: number; // 作用:兼容不同视图宽高
  blur: number;
  x: number;
  y: number;
  rotate: number;
  handleBlurChange: ICalculationFun;
  handleParallaxChange: ICalculationFun;
}
