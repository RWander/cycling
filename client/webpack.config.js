'use stricts';

/* eslint-disable no-undef */

const webpack = require('webpack');
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  entry: './src/index',
  output: {
    filename: './build/build.js'
  },

  watch: NODE_ENV === 'development',
  watchOptions: {
    aggregateTimeout: 1000
  },

  devtool: NODE_ENV === 'development' ? 'source-map' : null,

  plugins: [
    // In client js code you can the NODE_ENV value via process.env.NODE_ENV.
    new webpack.EnvironmentPlugin('NODE_ENV')
  ],

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js']
  },

  resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates: ['*-loader', '*'],
    extensions: ['', '.js']
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel'
    }]
  }
};

if (NODE_ENV === 'production') {
  module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_console: true,
      unsafe: true
    }
  }));
}
