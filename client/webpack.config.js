'use stricts';

/* eslint-disable no-undef */

var _ = require('lodash');
var webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'development';
const config = require(`./config/${NODE_ENV}`);

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
    new webpack.DefinePlugin(_.merge({ NODE_ENV: JSON.stringify(NODE_ENV) }, config)),
    new webpack.NoErrorsPlugin(), // Don't emit compiled js code if there are any errors
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    })
  ],

  module: {
    loaders: [
      { test: /\.js?$/, exclude: /node_modules/, loaders: [/*'react-hot',*/ 'babel'] },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.less/,loader: 'style-loader!css-loader!less-loader' }
    ]
  },

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions:['','.js','.json']
  },

  resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates: ['*-loader', '*'],
    extensions: ['', '.js']
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
