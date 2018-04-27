import { createStore } from 'redux';
import reducers from 'Reducers';
import middlewares from './middlewares'

import http from './middlewares/http'
import loadingBar from './middlewares/loading_bar'
import ReduxThunk from 'redux-thunk';
import router from './middlewares/router'

import { applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';

var preloadedStore = JSON.parse(document.getElementById('preloaded-store').getAttribute('content'))

const store = createStore(
  reducers,
  preloadedStore,
  composeWithDevTools(
    applyMiddleware(...middlewares)
  )
);
export default store;
