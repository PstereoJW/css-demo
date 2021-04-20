const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const PATHs = require("./PATH");
const path = require("path");
const webpack = require("webpack");

const devServer = {
  contentBase: path.resolve(PATHs.dist),
  compress: true, // GZip压缩
  historyApiFallback: true, //不跳转
  host: "127.0.0.1",
  port: 5050,
  open: true, //自动打开浏览器
};
const devConfig = {
  mode: "production",
  devtool: "eval-cheap-module-source-map",
  devServer,
};

module.exports = merge(commonConfig, devConfig);
