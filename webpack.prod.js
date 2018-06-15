var path = require("path");
var webpack = require("webpack");
var merge = require("webpack-merge");
var common = require("./webpack.common.js");

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  devtool: false
});
