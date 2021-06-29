import React, { useRef, useEffect } from 'react';
import tree from '../static/images/tree.png';
import grass from '../static/images/grass.png';
import leaf from '../static/images/leaf.png';
import smallGirl from '../static/images/small_girl.png';
import leaves from '../static/images/leaves.png';
import girlOpenEyes from '../static/images/girl_open_eyes.png';
import girlCloseEyes from '../static/images/girl_close_eyes.png';
import girlSquintEyes from '../static/images/girl_squint_eyes.png';

import './style.scss';
import { sleep, initBannerImages } from './config';

const BilibiliBanner = () => {
  const animateBannerRef = useRef<HTMLDivElement>(null);
  const animateGirlRef = useRef<HTMLDivElement>(null);
  const endPoint = useRef<{ width: number; x: number }>({ width: 0, x: 0 });

  // resize事件处理图片长宽
  useEffect(() => {
    initBannerImages(animateBannerRef);
    animateBannerRef.current?.addEventListener('resize', () => {
      initBannerImages(animateBannerRef, false);
    });
    return () => {
      animateBannerRef.current?.removeEventListener('resize', () => {});
    };
  }, []);

  // 鼠标移动事件处理图片动画
  const handleBannerMouseEnter = (e) => {
    const width = animateBannerRef.current?.getBoundingClientRect().width;
    endPoint.current.x = e.clientX;
    endPoint.current.width = width || 0;
  };

  const handleBannerMouseMove = (e) => {
    console.log(e);
    const deltaX = e.clientX - endPoint.current.x;
    initBannerImages(animateBannerRef, false, deltaX / endPoint.current.width);
  };

  const handleBannerMouseLeave = () => {
    endPoint.current.x = 0;
    endPoint.current.width = 0;
    initBannerImages(animateBannerRef, true);
  };

  // 眨眼
  const handleWink = async () => {
    if (animateGirlRef.current) {
      const img = animateGirlRef.current.childNodes[0] as HTMLImageElement;
      await sleep(50);
      img.src = girlSquintEyes;
      await sleep(50);
      img.src = girlCloseEyes;
      await sleep(300);
      img.src = girlSquintEyes;
      await sleep(50);
      img.src = girlOpenEyes;
      setTimeout(handleWink, 5 * 1000);
    }
  };
  setTimeout(handleWink, 5 * 1000);

  return (
    <div className="bili-banner">
      <div
        className="animate-banner"
        onMouseEnter={handleBannerMouseEnter}
        onMouseMove={handleBannerMouseMove}
        onMouseLeave={handleBannerMouseLeave}
        ref={animateBannerRef}
      >
        <div className="layer">
          <img src={tree} data-width="3000" data-height="250" alt="tree" />
        </div>
        <div className="layer" ref={animateGirlRef}>
          <img
            src={girlOpenEyes}
            data-width="3000"
            data-height="275"
            alt="girlOpenEyes"
          />
        </div>
        <div className="layer">
          <img src={grass} data-width="3000" data-height="250" alt="grass" />
        </div>
        <div className="layer">
          <img src={leaves} data-width="3000" data-height="250" alt="leaves" />
        </div>
        <div className="layer">
          <img
            src={smallGirl}
            data-width="3000"
            data-height="275"
            alt="smallGirl"
          />
        </div>
        <div className="layer">
          <img src={leaf} data-width="3000" data-height="275" alt="leaf" />
        </div>
      </div>
    </div>
  );
};

export default BilibiliBanner;
