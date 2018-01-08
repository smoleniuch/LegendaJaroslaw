var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './resources/assets/js/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },

  module: {

    loaders: [

      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }, {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          }, {
            loader: "css-loader"
          }]
      }, {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          }, {
            loader: "css-loader"
          }, {
            loader: "sass-loader",
            options: {
              includePaths: [
                path.resolve(__dirname, 'resources/assets/sass'),
                path.resolve(__dirname, 'resources/assets/sass/mixins/_size.scss')
              ]
            }
          }
        ]

      }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ['url-loader?limit=1000', 'img-loader']
      }

    ]

  },

  devtool: 'eval-source-map',

  resolve: {

    alias: {

      Actions: path.resolve(__dirname, 'resources/assets/js/actions'),
      Components: path.resolve(__dirname, 'resources/assets/js/components'),
      Containers: path.resolve(__dirname, 'resources/assets/js/containers'),
      Config:path.resolve(__dirname, 'resources/assets/js/config'),
      Http:path.resolve(__dirname, 'resources/assets/js/http'),
      Images: path.resolve(__dirname, 'resources/assets/images'),
      Layouts: path.resolve(__dirname, 'resources/assets/js/layouts'),
      Reducers: path.resolve(__dirname, 'resources/assets/js/reducers'),
      Sass: path.resolve(__dirname, 'resources/assets/sass'),
      Utilities: path.resolve(__dirname, 'resources/assets/js/utilities')

    }

  }
};
