const path = require("path");
const PATHs = require("./PATH");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, PATHs["dist"]),
    filename: "[name].[base:6].js",
  },
  module: { rules: [] },
  plugins: [
    new HtmlWebpackPlugin({
      title: "webpack_title",
      template: path.resolve(PATHs["public"], "index.html"),
      filename: path.resolve(PATHs["dist"], "index.html"),
      hash: true,
      minify: {
        removeAttributeQuotes: true, // 去除多余引号
        collapseWhitespace: true, // 移除空格
        removeComments: true, // 移除注释
      },
    }),
  ],
};
