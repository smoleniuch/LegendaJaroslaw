import { combineReducers } from 'redux';

import calendar from './calendar_reducer.js'

// Combine Reducers
var reducers = combineReducers({
  calendar
});

export default reducers;
