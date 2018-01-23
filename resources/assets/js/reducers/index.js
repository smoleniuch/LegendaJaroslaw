import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form'
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar'
import { routerReducer as router} from 'react-router-redux'

import calendar from './calendar_reducer.js'
import modal from './modal_reducer.js'
import user from './user_reducer.js'
import post from './post_reducer.js'
import motivationalQuote from './motivational_quote_reducer.js'



// Combine Reducers
var reducers = combineReducers({

  form,
  loadingBar,
  router,

  calendar,
  modal,
  user,
  post,
  motivationalQuote,
  

});

export default reducers;
