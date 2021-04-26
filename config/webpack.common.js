const path = require('path');
const PATHs = require('./PATH');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, PATHs['dist']),
    filename: '[name].[base:6].js'
  },
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        use: ['thread-loader']
      },
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: { loader: 'babel-loader' } //options在.babelrc配置
      },
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          fix: true // 自动修复
        }
      },
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'ts-loader',
        options: {
          happyPackMode: true
        }
      },
      {
        test: /\.(png|jpg|gif|ttf|eot|woff(2)?)(\?[=a-z0-9]+)?$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024, // 8 kb以下转 base64
          esModule: false, // 关闭默认 es模块引入方式
          outputPath: 'images', // 将文件打包到哪里
          publicPath: './images',
          name: '[hash:8].[ext]' // .ext 文件扩展名，jpg\png
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack_title',
      template: path.resolve(PATHs['public'], 'index.html'),
      filename: path.resolve(PATHs['dist'], 'index.html'),
      hash: true,
      minify: {
        removeAttributeQuotes: true, // 去除多余引号
        collapseWhitespace: true, // 移除空格
        removeComments: true // 移除注释
      }
    }),
    new ESLintPlugin({
      fix: true,
      extensions: ['js', 'json', 'coffee'],
      exclude: '/node_modules/'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(process.cwd(), 'src/static/fonts'),
          to: path.resolve(process.cwd(), 'dist/statics/fonts')
        }
      ]
    })
  ]
};
