
const { join } = require('path');

const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const webpackConfig = {
  devServer: {
    historyApiFallback: true,
    contentBase: join(__dirname, '../dist'),
    proxy: {
      'api': 'http://localhost:3001'
    },
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
