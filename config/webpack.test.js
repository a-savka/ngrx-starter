
const path = require('path');

const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

const parameters = require('./parameters.js');

const {
  ROOT,
  sourcePath,
  modulesPath,
  stylesPath,
  releasePath
} = parameters();

const METADATA = {
  title: 'Test Application',
  baseUrl: '/',
};

module.exports = function (options) {
  return {

    devtool: 'inline-source-map',

    resolve: {

      extensions: ['.ts', '.js'],

      modules: [path.join(ROOT, 'src'), 'node_modules']

    },

    module: {

      rules: [

        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader',
          exclude: [
            path.join(ROOT, 'node_modules/rxjs'),
            path.join(ROOT, 'node_modules/@angular')
          ]
        },

        {
          test: /\.ts$/,
          use: ['ts-loader', 'angular2-template-loader'],
          exclude: [/\.e2e\.ts$/]
        },

        {
          test: /\.css$/,
          use: ['to-string-loader', 'css-loader'],
          exclude: [stylesPath]
        },

        {
          test: /\.scss$/,
          use: ['to-string-loader', 'css-loader', 'sass-loader'],
          exclude: [stylesPath]
        },

        {
          test: /\.html$/,
          use: [{
            loader: 'raw-loader'
          }],
          exclude: path.join(ROOT, 'src', 'index.html')
        },

        {
          test: /\.json$/,
          use: 'json-loader'
        },

        {
          enforce: 'post',
          test: /\.(js|ts)$/,
          loader: 'istanbul-instrumenter-loader',
          include: path.join(ROOT, 'src'),
          exclude: [
            /\.(e2e|spec)\.ts$/,
            /node_modules/
          ]
        }

      ]
    },

    plugins: [

      new HtmlWebpackPlugin({
        template: 'src/index.html',
        title: METADATA.title,
        metadata: METADATA,
        inject: 'body'
      }),

      new LoaderOptionsPlugin({
        debug: false,
      }),

      new ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)@angular/,
        path.join(ROOT, 'src'),
        {
        }
      )

    ],

    performance: {
      hints: false
    },

    node: {
      global: true,
      process: false,
      crypto: 'empty',
      module: false,
      clearImmediate: false,
      setImmediate: false
    }

  };
}
