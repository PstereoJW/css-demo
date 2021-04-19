const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const devConfig = {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  plugins: [],
};

module.exports = merge(commonConfig, devConfig);
