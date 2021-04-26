import React, { FC } from 'react';
import './index.css';
import { message, Button } from 'antd';
import img from '../static/images/buka.png';

const Home: FC = () => {
  return (
    <div className="testTt">
      <img src={img} />
      <Button>reffef</Button>
      {message.info('tte')}
    </div>
  );
};
export default Home;
