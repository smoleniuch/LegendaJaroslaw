import ReactDOM from 'react-dom'
import React from 'react'
import fontawesome from '../vendor/fontawesome-free-5.0.10/svg-with-js/js/fontawesome-all.min.js'

var WebFont = require('webfontloader');

WebFont.load({
  google: {
    families: ['Dancing Script']
  }
});

import App from './app'
import 'Styles/index.scss'
ReactDOM.render(<App />, document.getElementById('app'))
