var path = require("path");
var webpack = require("webpack");
var _get = require('lodash/get')
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = env => ({

    entry: path.resolve(__dirname, "./resources/assets/js/index.js"),
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "public")
    },

    plugins: [
      // new webpack.ProvidePlugin({
      //   Promise: "bluebird"
      // }),
      new webpack.IgnorePlugin(/^\.\/locale/, /moment$/),
      ... _get(env, 'analyzeBundle')? [new BundleAnalyzerPlugin()] : []
    ],

    module: {
      rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: "babel-loader"
          },
          {
            test: /\.jsx$/,
            use: "babel-loader"
          },
          {
            test: /\.(woff|woff2|eot|ttf|svg)$/,
            use: "url-loader?limit=100000"
          },
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
          },
          {
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: ["url-loader?limit=1000", "img-loader"]
          },
          {
            test: /\.scss$/,
  
            use: ["style-loader", "css-loader", "sass-loader"]
          }
      ]
    },

    resolve: {
      alias: {
        Actions: path.resolve(__dirname, "resources/assets/js/actions"),
        Components: path.resolve(__dirname, "resources/assets/js/components"),
        Containers: path.resolve(__dirname, "resources/assets/js/containers"),
        Config: path.resolve(__dirname, "resources/assets/js/config"),
        Http: path.resolve(__dirname, "resources/assets/js/http"),
        Images: path.resolve(__dirname, "resources/assets/images"),
        Layouts: path.resolve(__dirname, "resources/assets/js/layouts"),
        Reducers: path.resolve(__dirname, "resources/assets/js/reducers"),
        Sass: path.resolve(__dirname, "resources/assets/styles/sass"),
        Styles: path.resolve(__dirname, "resources/assets/styles"),
        Utilities: path.resolve(__dirname, "resources/assets/js/utilities"),
        InlineStyles: path.resolve(
          __dirname,
          "resources/assets/styles/InlineStyles"
        ),
        Layouts: path.resolve(__dirname, "resources/assets/js/layouts"),
        Pages: path.resolve(__dirname, "resources/assets/js/layouts/pages"),
        Router: path.resolve(__dirname, "resources/assets/js/router/"),
        PostTemplates: path.resolve(
          __dirname,
          "resources/assets/js/postTemplates"
        )
      }
    }});
