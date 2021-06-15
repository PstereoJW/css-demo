import React, { useRef } from 'react';

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
) => {};
