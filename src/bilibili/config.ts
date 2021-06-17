import React from 'react';
import { IConfig } from './interface';

export const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

// 每张图片的默认属性配置
export const InitConfig: IConfig[] = [
  {
    scale: 1,
    blur: 4,
    x: 0,
    y: 0,
    rotate: 0,
    handleBlurChange: (blur, delta) => blur + delta * blur, // 鼠标右移，树越模糊
    handleParallaxChange: (x, delta) => x // x不变
  },
  {
    scale: 0.6,
    blur: 0,
    x: 0,
    y: 0,
    rotate: 0,
    handleBlurChange: (blur, delta) => Math.abs(blur + delta * 10), // 鼠标左右移，女孩的脸越模糊
    handleParallaxChange: (x, delta) => x + delta * 10 // 鼠标移动与女孩移动方向相同
  },
  {
    scale: 0.6,
    blur: 1,
    x: -50,
    y: 0,
    rotate: 0,
    handleBlurChange: (blur, delta) => Math.abs(blur + delta * 10), // 鼠标左右移动，草地越模糊
    handleParallaxChange: (x, delta) => x + delta * 30 // 鼠标移动与草地移动方向相同
  },
  {
    scale: 0.6,
    blur: 4,
    x: 0,
    y: 4.2,
    rotate: 0,
    handleBlurChange: (blur, delta) => Math.abs(blur - delta * 15), // 鼠标向右，落叶地越清晰
    handleParallaxChange: (x, delta) => x + delta * 30 // 鼠标移动与落叶地移动方向相同
  },
  {
    scale: 0.6,
    blur: 5,
    x: 0,
    y: -1.8,
    rotate: 0,
    handleBlurChange: (blur, delta) => Math.abs(blur - delta * 10), // 鼠标向右，小女孩越清晰，比落叶地慢
    handleParallaxChange: (x, delta) => x + delta * 60 // 鼠标移动与落叶地移动方向相同，小女孩的移动比落叶地快一倍
  },
  {
    scale: 0.64,
    blur: 6,
    x: 0,
    y: 0,
    rotate: 0,
    handleBlurChange: (blur, delta) => Math.abs(blur - delta * 8), // 鼠标向右，小叶子越清晰，比小女孩慢
    handleParallaxChange: (x, delta) => x + delta * 70 // 鼠标移动与落叶地移动方向相同，小叶子的移动比小女孩快
  }
];

// 初始化banner图片
export const initBannerImages = (
  banner: React.RefObject<HTMLDivElement>,
  isReset: boolean = false,
  scale?: number
) => {
  const bannerRect = banner.current?.getBoundingClientRect();
  if (
    bannerRect &&
    banner.current?.childNodes &&
    banner.current.childNodes.length
  ) {
    Array.from(banner.current.childNodes).forEach((item, index) => {
      const img = item.childNodes[0] as HTMLImageElement;
      initRectNormalScreen(index, img, bannerRect, isReset);
      if (scale) {
        handleMouseMoveChange(index, img, scale);
      }
    });
  }
};

// 初始化图片长宽和动画样式
const initRectNormalScreen = (
  key: number,
  img: HTMLImageElement,
  bannerRect: DOMRect,
  isReset: boolean = false
) => {
  const originWidth = parseInt(img.dataset.width as string, 10);
  const originHeight = parseInt(img.dataset.height as string, 10);
  const screenWidth = parseInt(img.dataset.screenWidth as string, 10);
  const width = InitConfig[key].scale * originWidth;
  const height = InitConfig[key].scale * originHeight;
  img.width = width;
  img.height = height;
  // @ts-ignore
  img.style = initStyle(key, isReset);
};

// 初始化动画样式
const initStyle = (key: number, isReset: boolean = false) =>
  handleAnimateStyle(
    InitConfig[key].x,
    InitConfig[key].y,
    InitConfig[key].blur,
    InitConfig[key].rotate,
    isReset
  );

// 实际修改动画样式
const handleAnimateStyle = (
  x: number,
  y: number,
  blur: number,
  rotate: number,
  isReset: boolean = false
) =>
  `filter: blur(${blur}px); transform: translate(${x}px, ${y}px) rotate(${rotate}deg); transition-duration:${
    isReset ? '0.2s' : '0s'
  }`;

const handleMouseMoveChange = (
  key: number,
  img: HTMLImageElement,
  scale: number
) => {
  // @ts-ignore
  img.style = handleAnimateStyle(
    InitConfig[key].handleParallaxChange(InitConfig[key].x, scale),
    InitConfig[key].y,
    InitConfig[key].handleBlurChange(InitConfig[key].blur, scale),
    InitConfig[key].rotate
  );
};
