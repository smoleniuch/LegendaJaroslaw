import { combineReducers } from 'redux';

import calendar from './calendar_reducer.js'
import modal from './modal_reducer.js'
import user from './user_reducer.js'
import { reducer as form } from 'redux-form'
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar'

// Combine Reducers
var reducers = combineReducers({
  calendar,
  modal,
  form,
  user,
  loadingBar,
  
});

export default reducers;
