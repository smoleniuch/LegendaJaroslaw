let mix = require('laravel-mix');
var path = require('path')
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({

  devtool:'eval-source-map',

  resolve:{

    alias:{

      Components:path.resolve(__dirname,'resources/assets/js/components'),
      Layouts:path.resolve(__dirname,'resources/assets/js/layouts'),
      Sass:path.resolve(__dirname,'resources/assets/sass'),
      Images:path.resolve(__dirname,'resources/assets/images'),

    }

  },




})



// mix.react('resources/assets/js/index.js', 'public/js')
