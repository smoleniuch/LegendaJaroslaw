import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form'
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar'

import calendar from './calendar_reducer.js'
import modal from './modal_reducer.js'
import user from './user_reducer.js'
import post from './post_reducer.js'
import motivationalQuote from './motivational_quote_reducer.js'
import gallery from './gallery_reducer.js'
import router from './router_reducer.js'
import workout from './workout_reducer.js'


// Combine Reducers
var reducers = combineReducers({

  form,
  loadingBar,

  calendar,
  modal,
  user,
  post,
  motivationalQuote,
  gallery,
  router,
  workout,

});

export default reducers;
