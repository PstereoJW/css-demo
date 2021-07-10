import React from 'react';
import { hot } from 'react-hot-loader/root';
import BilibiliBanner from './bilibili';
import XinJiangBannner from './xinjiangBanner';
import Cyberpunk from './cyberpunk';

const App = () => (
  <div>
    {/* <BilibiliBanner />
    <XinJiangBannner /> */}
    <Cyberpunk />
  </div>
);

export default hot(App);
