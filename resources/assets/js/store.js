import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';

import { httpMiddleware } from 'Http'

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(
      httpMiddleware(),
      ReduxThunk,
    )
  )

);
export default store;
