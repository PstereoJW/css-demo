const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const PATHs = require('./PATH');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const devServer = {
  contentBase: path.resolve(PATHs.dist),
  compress: true, // GZip压缩
  historyApiFallback: true, //不跳转
  host: '127.0.0.1',
  port: 5050,
  open: false //自动打开浏览器
};
const devConfig = {
  mode: 'production',
  devtool: 'eval-cheap-module-source-map',
  devServer,
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          'style-loader',
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
  plugins: [new CleanWebpackPlugin()],
  optimization: {
    splitChunks: {
      minSize: 0, // 默认30000（30kb），但是demo中的文件都很小，minSize设为0，让每个文件都满足大小条件
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

module.exports = merge(commonConfig, devConfig);
