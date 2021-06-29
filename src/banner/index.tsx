/* eslint-disable no-undef */
import React, { useRef, useEffect, useState, ReactNode } from 'react';
import './style.scss';
import { defaultSettings } from './config';

interface ParallaxBannerProps {
  options?: any;
  styleProps?: any;
  children: ReactNode;
}

const ParallaxBanner = (props: ParallaxBannerProps) => {
  const { options, styleProps } = props;
  const backgroundRef = useRef<HTMLDivElement>(null);
  const transitionTimeout = useRef<NodeJS.Timer>();
  const updateCall = useRef<number>();
  const setting = useRef({ ...defaultSettings });
  const reverse = useRef(setting.current.reverse ? -1 : 1);
  const width = useRef<number>(0);
  const height = useRef<number>(0);
  const left = useRef<number>(0);
  const top = useRef<number>(0);
  const [style, setStyle] = useState({});

  useEffect(() => {
    if (options) setting.current = options;
    if (styleProps) setStyle(styleProps);
  }, []);

  const updateElementPosition = () => {
    if (backgroundRef.current) {
      const backRect = backgroundRef.current.getBoundingClientRect();
      width.current = backgroundRef.current.offsetWidth; // 布局宽度
      height.current = backgroundRef.current.offsetHeight; // 布局高度
      left.current = backRect.left;
      top.current = backRect.top;
    }
  };

  const handleMouseEnter = () => {
    updateElementPosition();
    setStyle({});
    handleTransition();
  };
  const handleMouseMove = (e) => {
    if (updateCall.current) {
      window.cancelAnimationFrame(updateCall.current);
    }
    updateCall.current = requestAnimationFrame(() => update(e));
  };
  const handleMouseLeave = () => {
    handleTransition();
    if (setting.current.reset) {
      handleReset();
    }
  };

  const update = (e) => {
    const values = getValues(e);
    console.log('values', values);

    console.log(
      'new css transform values',
      `perspective(${setting.current.perspective}px) 
       rotateX(${setting.current.axis === 'x' ? 0 : values.tiltY}deg)
       rotateY(${setting.current.axis === 'y' ? 0 : values.tiltX}deg)
       scale3d(${setting.current.scale}), ${setting.current.scale},${
        setting.current.scale
      }`
    );
    setStyle((preStyle) => ({
      ...preStyle,
      transform: `perspective(${setting.current.perspective}px) rotateX(${
        setting.current.axis === 'x' ? 0 : values.tiltY
      }deg) rotateY(${
        setting.current.axis === 'y' ? 0 : values.tiltX
      }deg) scale3d(${setting.current.scale}, ${setting.current.scale},${
        setting.current.scale
      })`
    }));
    updateCall.current = undefined;
  };

  const getValues = (e) => {
    const x = (e.clientX - left.current) / width.current;
    const y = (e.clientY - top.current) / height.current;
    debugger;
    const _x = Math.min(Math.max(x, 0), 1);
    const _y = Math.min(Math.max(y, 0), 1);

    const tiltX = (
      reverse.current *
      (setting.current.max / 2 - _x * setting.current.max)
    ).toFixed(2);
    const tiltY = (
      reverse.current *
      (setting.current.max / 2 - _y * setting.current.max)
    ).toFixed(2);
    const percentageX = _x * 100;
    const percentageY = _y * 100;

    console.log(
      'JUST GOT NEW VALUES',
      `X: ${x} Y: ${y} -- TILT X: ${tiltX} TILT Y: ${tiltY} -- TILT X%: ${percentageX} TILT Y%: ${percentageY}`
    );
    console.log('Notice how X turned into percentageX.');

    return { tiltX, tiltY, percentageX, percentageY };
  };

  const handleTransition = () => {
    if (transitionTimeout.current) {
      clearTimeout(transitionTimeout.current);
    }
    console.log(
      'set transition',
      `Speed:${setting.current.speed}ms Easing: ${setting.current.easing}`
    );
    setStyle((preStyle) => ({
      ...preStyle,
      transition: `${setting.current.speed}ms ${setting.current.easing}`
    }));
    transitionTimeout.current = setTimeout(() => {
      console.log('transition complete');
      setStyle((preStyle) => ({ ...preStyle, transition: '' }));
    }, setting.current.speed);
  };

  const handleReset = () => {
    window.requestAnimationFrame(() => {
      console.log(
        'reset transform state',
        `perspective(${setting.current.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`
      );
      setStyle((preStyle) => ({
        ...preStyle,
        transform: `perspective(${setting.current.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`
      }));
    });
  };

  useEffect(
    () => () => {
      if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
      if (updateCall.current) cancelAnimationFrame(updateCall.current);
    },
    []
  );

  return (
    <div
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={backgroundRef}
    >
      {props.children}
    </div>
  );
};

export default ParallaxBanner;
