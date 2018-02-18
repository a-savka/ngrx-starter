
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const parameters = require('./parameters.js');

const {
  ROOT,
  DEV_SERVER_PORT,
  DEV_SERVER_HOST,
  sourcePath,
  modulesPath,
  stylesPath,
  releasePath
} = parameters();

module.exports = function() {
  return webpackMerge(commonConfig(), {

    devtool: 'source-map',

    output: {
      path: releasePath,
      filename: '[name].bundle.js',
      sourceMapFilename: '[file].map'
    },

    module: {

      rules: [

        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
          include: [stylesPath]
        },

        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
          include: [stylesPath]
        }

      ]

    },

    devServer: {
      port: DEV_SERVER_PORT,
      host: DEV_SERVER_HOST,
      historyApiFallback: true,
      watchOptions: {
        ignored: /node_modules/
      }
    },

    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }

  });
}