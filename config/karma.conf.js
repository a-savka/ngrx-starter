module.exports = function (config) {
  var testWebpackConfig = require('./webpack.test.js')({ env: 'test' });

  var configuration = {

    basePath: '',

    frameworks: ['jasmine'],

    exclude: [],

    client: {
      captureConsole: false
    },

    files: [
      { pattern: './config/spec-bundle.js', watched: false }
    ],

    proxies: {
      "/assets/": "/base/src/assets/"
    },

    preprocessors: { './config/spec-bundle.js': ['coverage', 'webpack', 'sourcemap'] },

    webpack: testWebpackConfig,

    coverageReporter: {
      type: 'in-memory'
    },

    remapCoverageReporter: {
      'text-summary': null,
      json: './coverage/coverage.json',
      html: './coverage/html'
    },

    bambooReporter: {
      filename: 'mocha.json'
    },

    webpackMiddleware: {

      noInfo: true,
      stats: {
        chunks: false
      }
    },

    reporters: ['mocha', 'coverage', 'remap-coverage'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_WARN,

    autoWatch: false,

    browsers: [
      'PhantomJS'
    ],

    singleRun: true
  };

  config.set(configuration);
};