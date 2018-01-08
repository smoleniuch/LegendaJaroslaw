import { combineReducers } from 'redux';

import calendar from './calendar_reducer.js'
import modals from './modal_reducer.js'

// Combine Reducers
var reducers = combineReducers({
  calendar,
  modals
});

export default reducers;
