'use stricts';

/* eslint-disable no-undef */

const webpack = require('webpack');
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  // input
  context: __dirname + '/src',
  entry: {
    index: './index'
  },

  // output
  output: {
    path: 'public',
    filename: './[name].js'
  },

  // watch options
  watch: NODE_ENV === 'development',
  watchOptions: {
    aggregateTimeout: 1000
  },

  // Source map
  devtool: NODE_ENV === 'development' ? 'source-map' : null,

  plugins: [
    new webpack.EnvironmentPlugin('NODE_ENV'), // In client js code you can the NODE_ENV value via process.env.NODE_ENV.
    new webpack.NoErrorsPlugin(), // Don't emit compiled js code if there are any errors
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    })
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
      exclude: /\/node_modules\//,
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
