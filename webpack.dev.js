var path = require("path");
var merge = require("webpack-merge");
var common = require("./webpack.common.js");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = merge(common, {
//   plugins: [new BundleAnalyzerPlugin()],
  mode:'development',
  devtool: "eval-source-map",
});
