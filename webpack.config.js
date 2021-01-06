const webpack  = require("webpack");
const path = require("path");
const dotenv = require('dotenv').config();
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Other definitions
if (dotenv.error) {
  throw dotenv.error
}
const manifestOptions = {};
console.log(process.env.PUBLIC_DIRECTORY);

// Webpack configuration
module.exports = {
  target: "web",
  mode: "development",
  devtool: 'inline-source-map',
  entry: './src/index.js',
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, process.env.PUBLIC_DIRECTORY),
  },
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "util": require.resolve("util/"),
      "buffer": require.resolve("buffer/"),
      "crypto": false,
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "vm": false,
      "assert": false,
      "constants": require.resolve("constants-browserify"),
      "stream": require.resolve("stream-browserify")
    }
  },
  externals: [
    "fs",
    "worker_threads",
    "child_process",
    "inspector",
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {loader: 'css-loader', options: {sourceMap: true, importLoaders: 1, modules: true }},
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackManifestPlugin(manifestOptions),
    new HtmlWebpackPlugin({
      title: "Infinite Scroll"
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, process.env.PUBLIC_DIRECTORY),
    open: false,
    compress: true,
    hot: true,
    port: 9001,
    clientLogLevel: 'debug'
  },
};

// References
  // https://github.com/webpack/webpack/issues/11282