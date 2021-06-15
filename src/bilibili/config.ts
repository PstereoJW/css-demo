import React from 'react';
import { IConfig } from './interface';

export const InitConfig: IConfig[] = [];

export const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

// 初始化banner图片
export const initBannerImages = (
  banner: React.RefObject<HTMLDivElement>,
  deltaX: number
) => {
  const bannerRect = banner.current?.getBoundingClientRect();
  if (
    bannerRect &&
    banner.current?.childNodes &&
    banner.current.childNodes.length
  ) {
    Array.from(banner.current.childNodes).forEach((item, index) => {
      const img = item.childNodes[0] as HTMLImageElement;
      initRectNormalScreen(index, img, bannerRect);
    });
  }
};

const initRectNormalScreen = (
  key: number,
  img: HTMLImageElement,
  bannerRect: DOMRect
) => {
  const originWidth = parseInt(img.dataset.width as string, 10);
  const originHeight = parseInt(img.dataset.height as string, 10);
  const screenWidth = parseInt(img.dataset.screenWidth as string, 10);
  // const width = initConfig[key].aspect * originWidth;
};
