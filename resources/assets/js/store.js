import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';

import { httpMiddleware } from 'Http'
import { loadingBarMiddleware } from 'react-redux-loading-bar'

var preloadedStore = JSON.parse(document.getElementById('preloaded-store').getAttribute('content'))

const store = createStore(
  reducers,
  preloadedStore,
  composeWithDevTools(
    applyMiddleware(
      ReduxThunk,
      httpMiddleware(),
      loadingBarMiddleware({
        promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAIL'],
        scope:'modal',
      })
    )
  )

);
export default store;
