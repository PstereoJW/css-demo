const { merge } = require('webpack-merge');
const PATHs = require('./PATH');
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const commonConfig = require('./webpack.common');
const devServer = {
  contentBase: path.resolve(PATHs.dist),
  compress: true, // GZip压缩
  historyApiFallback: false, //不跳转
  host: '127.0.0.1',
  port: 5050,
  open: false //自动打开浏览器
};
const devConfig = {
  mode: 'development',
  devtool: 'source-map',
  devServer,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      ident: 'postcss',
                      sourceMap: true,
                      plugins: () => [require('autoprefixer')]
                    }
                  ]
                ]
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash:6].css'
    })
  ]
};

module.exports = merge(commonConfig, devConfig);
