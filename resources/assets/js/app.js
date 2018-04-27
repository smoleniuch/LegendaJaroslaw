import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
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
