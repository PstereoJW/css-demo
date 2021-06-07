const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const commonConfig = require('./webpack.common');

const devConfig = {
  mode: 'production',
  devtool: 'eval-cheap-module-source-map',
  module: {
    rules: []
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // 文件名中插入文件内容的 hash 值
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[id].[contenthash].css',
      ignoreOrder: false
    }),
    new BundleAnalyzerPlugin()
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin()],
    splitChunks: {
      minSize: 0, // 默认30000（30kb），但是demo中的文件都很小，minSize设为0，让每个文件都满足大小条件,
      cacheGroups: {
        vendor: {
          // nodeModules 代码单独打包成一个 chunk 输出
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial',
          name: 'vendor'
        },
        commons: {
          // 多次import的文件打包成一个单独的common.js
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5,
          name: 'common'
        }
      }
    }
  }
};

const mergedConfig = merge(commonConfig, devConfig);
const smp = new SpeedMeasurePlugin();
const prodConfig = smp.wrap(mergedConfig);
module.exports = prodConfig;
