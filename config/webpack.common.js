const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WebpackBar = require('webpackbar');
const PATHs = require('./PATH');

function getCssLoaders(importLoaders) {
  return [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: false,
        sourceMap: true,
        importLoaders
      }
    },
    {
      loader: 'postcss-loader',
      options: { sourceMap: true }
    }
  ];
}

module.exports = {
  entry: [
    'react-hot-loader/patch',
    path.resolve(__dirname, '../src/index.tsx')
  ],
  output: {
    path: path.resolve(__dirname, PATHs.dist),
    filename: '[name].[base:6].js'
  },
  resolve: {
    // 我们导入ts 等模块一般不写后缀名，webpack 会尝试使用这个数组提供的后缀名去导入
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        use: ['thread-loader', 'cache-loader', 'babel-loader'],
        include: [path.resolve(__dirname, '../src')],
        exclude: /node_modules/
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
      },
      {
        test: /\.css$/,
        use: getCssLoaders(1)
      },
      {
        test: /\.less$/,
        use: [
          // postcss-loader + less-loader 两个 loader，所以 importLoaders 应该设置为 2
          ...getCssLoaders(2),
          {
            loader: 'less-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          ...getCssLoaders(2),
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack_title',
      template: path.resolve(PATHs.public, 'index.html'),
      filename: path.resolve(PATHs.dist, 'index.html'),
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
    }),
    new WebpackBar({
      name: 'react-typescript-boilerplate',
      // react 蓝
      color: '#61dafb'
    }),
    new FriendlyErrorsPlugin()
  ]
};
