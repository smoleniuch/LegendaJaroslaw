import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import router from './router';
import ModalContainer from 'Containers/ModalContainer'

class App extends React.Component {
  render() {

    return (

      <Provider store={store}>
        <React.Fragment>
        {router}
        <ModalContainer />
        </React.Fragment>
      </Provider>

    )
  }
}

export default App
