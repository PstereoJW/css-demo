import React from 'react';
import { hot } from 'react-hot-loader/root';
import BilibiliBanner from './bilibili';
import ParallaxBanner from './banner';
import dogBackground from './static/images/3d_banner.jpg';
import forword from './static/images/forword.jpg';
import Shopee from './shopee';

const App = () => (
  <div>
    <BilibiliBanner />
    <div>
      <ParallaxBanner
        options={{}}
        styleProps={{
          background: `url(${dogBackground}) no-repeat center`,
          backgroundSize: 'fit',
          height: 300,
          width: 500,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <ParallaxBanner
          options={{ max: 10, perspective: 1000, scale: 1.05 }}
          styleProps={{}}
        >
          <img style={{ width: 200, height: 200 }} src={forword} alt="back" />
        </ParallaxBanner>
      </ParallaxBanner>
    </div>

    {/* <Shopee /> */}
  </div>
);
export default hot(App);
