const webpack  = require("webpack");
const path = require("path");
const dotenv = require('dotenv').config();
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// Other definitions
if (dotenv.error) {
  throw dotenv.error
}
const manifestOptions = {};
console.log(process.env.PUBLIC_DIRECTORY);

// Webpack configuration
module.exports = {
  mode: "development",
  entry: './src/index.js',
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, process.env.PUBLIC_DIRECTORY),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        ignore: /node_modules/,
        loader: "babel-loader",
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackManifestPlugin(manifestOptions)
  ]
};