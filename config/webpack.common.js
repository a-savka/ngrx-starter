
const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
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
  title: 'Test application',
  baseUrl: '/',
};

module.exports = function() {

  return {

    entry: {
      'polifills': './src/polyfills.ts',
      'main': './src/main.ts',
      'style': './src/styles/app.scss'
    },

    resolve: {
      extensions: ['.ts', '.js', '.json', '.css', '.scss'],
      modules: [sourcePath, modulesPath]
    },

    module: {

      rules: [
        {
          test: /\.ts$/,
          use: ['ts-loader', 'angular2-template-loader'],
          exclude: [/\.(spec|e2e)\.ts$/]
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

      new ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)@angular/,
        path.join(ROOT, 'src'),
        {
        }
      ),

      new webpack.DefinePlugin({
        IS_PRODUCTION: JSON.stringify(false)
      })

    ],

    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }

  };

}
