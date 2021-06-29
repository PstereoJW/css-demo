import React from 'react';
import { hot } from 'react-hot-loader/root';
import BilibiliBanner from './bilibili';
import ParallaxBanner from './banner';
import dogBackground from './static/images/3d_banner.jpg';
import forword from './static/images/forword.jpg';

const App = () => (
  <div>
    {/* <BilibiliBanner /> */}
    <ParallaxBanner>
      <img src={dogBackground} alt="back" />
    </ParallaxBanner>
  </div>
);
export default hot(App);
