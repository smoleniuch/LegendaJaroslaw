import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

import { httpMiddleware } from 'Http'

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(
      httpMiddleware(),
    )
  )

);
export default store;
