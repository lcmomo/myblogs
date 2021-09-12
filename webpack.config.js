const argv = require('yargs-parser')(process.argv.slice(2)); // 获取命令行参数
const _mode = argv.mode || 'development';

const _mergeConfig = require(`./config/webpack.${_mode}.js`); // 当前环境的配置文件

const { merge } = require('webpack-merge');
const { resolve } = require('path');

const { CheckerPlugin } = require("awesome-typescript-loader");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackConfig = {
  entry: {
    app: resolve('./src/client/index.tsx')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [resolve('src')],
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(ts|tsx)$/,
        include: [resolve('src')],
        exclude: /node_modules/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [
    new CheckerPlugin(),
    new HtmlWebpackPlugin({
      filename:"index.html",
      template:"src/client/index.html"
    })
  ]
}

module.exports = merge(webpackConfig, _mergeConfig);
