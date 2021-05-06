const { merge } = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const PATHs = require('./PATH');

const commonConfig = require('./webpack.common');

const devServer = {
  contentBase: path.resolve(PATHs.dist),
  compress: true, // GZip压缩
  historyApiFallback: false, // 不跳转
  host: '127.0.0.1',
  port: 5050,
  open: false // 自动打开浏览器
};
const devConfig = {
  mode: 'development',
  devtool: 'source-map',
  devServer,
  module: {
    rules: []
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};

module.exports = merge(commonConfig, devConfig);
