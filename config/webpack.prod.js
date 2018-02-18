const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

const parameters = require('./parameters.js');

const {
  ROOT,
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
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{
              loader: 'css-loader'
            }]
          }),
          include: stylesPath
        },

        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{
              loader: 'css-loader'
            }, {
              loader: 'sass-loader'
            }]
          }),
          include: stylesPath
        }

      ]

    },

    plugins: [

      new OptimizeJsPlugin({
        sourceMap: false
      }),

      new ExtractTextPlugin('[name].[contenthash].css'),

      new UglifyJsPlugin({
        beautify: false,
        output: {
          comments: false
        },
        mangle: {
          screw_ie8: true
        },
        compress: {
          screw_ie8: true,
          warnings: false,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
          negate_iife: false
        },
      })

    ]

  });
};
