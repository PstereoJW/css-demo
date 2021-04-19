const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const devConfig = {
  mode: "production",
  devtool: "eval-cheap-module-source-map",
  plugins: [],
};

module.exports = merge(commonConfig, devConfig);
