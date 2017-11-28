import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import router from './router';


class App extends React.Component {
  render() {

    return (

      <Provider store={store}>
        {router}
      </Provider>

    )
  }
}

export default App
