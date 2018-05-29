import React from 'react';
import { Provider } from 'react-redux';

import './broadcast'
import store from './store';
import { Router } from 'Router/index.js';

 


class App extends React.Component {
  render() {

    return (

      <Provider store={store}>

            <Router />

      </Provider>

    )
  }
}

export default App
