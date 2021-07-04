import React from 'react';
import { hot } from 'react-hot-loader/root';
import BilibiliBanner from './bilibili';
import XinJiangBannner from './xinjiangBanner';

const App = () => (
  <div>
    <BilibiliBanner />
    <XinJiangBannner />
  </div>
);
export default hot(App);
