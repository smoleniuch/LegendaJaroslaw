import ReactDOM from 'react-dom'
import React from 'react'
var WebFont = require('webfontloader');

WebFont.load({
  google: {
    families: ['Dancing Script']
  }
});

import App from './app'
import 'Styles/index.scss'
ReactDOM.render(<App />, document.getElementById('app'))
