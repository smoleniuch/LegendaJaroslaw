import { combineReducers } from 'redux';

import testReducer from './test-reducer.js'

// Combine Reducers
var reducers = combineReducers({
  testReducer:testReducer
});

export default reducers;
