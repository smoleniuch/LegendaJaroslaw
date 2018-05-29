import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form'
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar'

import calendar from './calendar_reducer.js'
import modal from './modal_reducer.js'
import loadingButton from './loading_button_reducer.js'
import user from './user_reducer.js'
import post from './post_reducer.js'
import motivationalQuote from './motivational_quote_reducer.js'
import gallery from './gallery_reducer.js'
import router from './router_reducer.js'
import workout from './workout_reducer.js'
import notifications from './notification_reducer'
import activeRequest from './active_request_reducer'
import chat from './chat_reducer'

// Combine Reducers
var reducers = combineReducers({

  form,
  loadingBar,

  chat,
  loadingButton,
  activeRequest,
  calendar,
  modal,
  user,
  post,
  motivationalQuote,
  gallery,
  router,
  workout,
  notifications,


});

export default reducers;
