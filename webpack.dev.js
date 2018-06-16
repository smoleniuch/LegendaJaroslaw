var path = require("path");
var merge = require("webpack-merge");
var common = require("./webpack.common.js");


module.exports = (...args) => {
  return merge(common(...args), {
    mode: "development",
    devtool: "cheap-module-source-map"
  });
};
