var path = require("path");
var webpack = require("webpack");
var merge = require("webpack-merge");
var common = require("./webpack.common.js");

const CompressionPlugin = require("compression-webpack-plugin")

module.exports = (...args) => merge(common(...args), {
  mode: "production",
  plugins:[new CompressionPlugin({
      deleteOriginalAssets:true,
  })],
  devtool: false
});
