
const { join } = require('path');

const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const webpackConfig = {
  output: {
    filename: 'app.js',
    publicPath: '/dist'
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: join(__dirname, '../dist'),
    },
    // open: {
    //   target: ['/dist/index.html'],
    // },
    // devMiddleware: {
    //   // index: true,
    //   // mimeTypes: { 'text/html': ['phtml'] },
    //   // publicPath: join(__dirname, '../dist'),
    //   // serverSideRender: true,
    //   // writeToDisk: true,
    // },
    // historyApiFallback: {
    //   rewrites: [
    //     { from: /^\/$/, to: '/dist/index.html' },
    //   ],
    // },
    compress: true,
    // proxy: {
    //   'api': 'http://localhost:3001'
    // },

    hot: true,
    port: 8080
  },
  plugins: [
    new WebpackBuildNotifierPlugin({
      title: 'My Webpack Build',
      // logo: "",
      suppressSuccess: true
    })
  ]
}

module.exports = webpackConfig;
