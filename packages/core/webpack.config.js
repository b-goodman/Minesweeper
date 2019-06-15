const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: {
    es: "./src/index.ts"
  },
  output: {
    filename: "index.js"
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        type: "javascript/esm",
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
}
