const argv = require('yargs-parser')(process.argv.slice(2)); // 获取命令行参数
const _mode = argv.mode || 'development';
const _modeflag = (_mode == "production" ? true : false);
const _mergeConfig = require(`./config/webpack.${_mode}.js`); // 当前环境的配置文件

const { merge } = require('webpack-merge');
const { resolve } = require('path');

// const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default
const { CheckerPlugin } = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
// const DashboardPlugin = require('webpack-dashboard/plugin');
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const appPath = resolve('src/client');

const webpackConfig = {
  entry: {
    app: resolve('./src/client/index.tsx'),
    // vendor: ['react', 'react-dom'] // 不变的代码分包
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src/client'),
    },
    extensions: ['.ts', '.tsx', '.js', 'jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [appPath],
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(ts|tsx)$/,
        include: [appPath],
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        test: /\.(css|less)$/,
        include: [appPath],
        exclude: /node_modules/,
        use: [
          // [style-loader](/loaders/style-loader)
          // { loader: 'style-loader' },
          { loader: MiniCssExtractPlugin.loader },
          // [css-loader](/loaders/css-loader)
          {
            loader: 'css-loader',
            // options: {
            //   modules: true
            // }
          },
          // [sass-loader](/loaders/sass-loader)
          { loader: 'less-loader' }
        ]
      }
    ]
  },
  plugins: [
    // new WebpackDeepScopeAnalysisPlugin(),
    new WebpackManifestPlugin(),
    new CheckerPlugin(),
    new MiniCssExtractPlugin({
      filename: _modeflag ? "css/[name].[hash:5].css" : "css/[name].css",
      chunkFilename: _modeflag ? "css/[id].[hash:5].css" : "css/[name].css"
    }),
    new HtmlWebpackPlugin({
      filename:"index.html",
      template:"src/client/index.html"
    }),
    new ProgressBarPlugin(),
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerMode: 'static'
    })
    // new DashboardPlugin(),
  ]
}

module.exports = merge(webpackConfig, _mergeConfig);
