import React from 'react';
import './style.scss';
import ParallaxBanner from '../banner';
import xinjiangBackground from '../static/images/xinjiang.jpg';

const XinJiangBannner = () => (
  <div>
    <div className="xinjiangBanner">
      <ParallaxBanner
        options={{}}
        styleProps={{
          background: `url(${xinjiangBackground}) no-repeat center/100%`,
          width: '700px',
          height: '500px'
        }}
      >
        <ParallaxBanner
          options={{ max: 50, perspective: 1000, scale: 1.05 }}
          styleProps={{}}
        >
          <main>
            <h1>石河子</h1>
            <h2>一个小团场</h2>
          </main>
        </ParallaxBanner>
      </ParallaxBanner>
    </div>
  </div>
);

export default XinJiangBannner;
