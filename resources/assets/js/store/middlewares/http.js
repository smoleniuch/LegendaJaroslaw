import axios from "axios";
import _get from "lodash/get";
import _has from "lodash/has";
import _set from "lodash/set";
import _isFunction from "lodash/isFunction";
import _cloneDeep from "lodash/cloneDeep";
import config from "Config";
import { successNotification, errorNotification } from "Actions/notificationSystemActions";
import { addRequest, removeRequest } from "Actions/activeRequestActions";
import {multiClientMiddleware} from "redux-axios-middleware";
import {getSocketId} from '../../broadcast.js';

const middlewareConfig = {
  
  interceptors: {
    request: [
      {
        success: ({ getState, dispatch, getSourceAction }, req) =>  {
          
          _set(req, 'headers.X-Socket-ID', getSocketId())

          var action = req.reduxSourceAction
          if(action.payload.scope){
            dispatch(addRequest(action.payload.scope))
          }
          return req;
        },
        error: function({ getState, dispatch, getSourceAction }, error) {
          throw error;
        }
      }
    ],
    response: [
      {
        success: function({ getState, dispatch, getSourceAction }, res) {
          var action = getSourceAction(res.config); //contains information about request object
          var successMsg = _get(action, "payload.notify.success.message");
          var displaySuccessMsg = _get(action, "payload.notify.success.display", () => true);
          var errorMsg = _get(action, "payload.notify.error.message");

          if(action.payload.scope){
            dispatch(removeRequest(action.payload.scope))
          }

          if (successMsg && displaySuccessMsg(res)) {
            dispatch(successNotification({message:_isFunction(successMsg)?successMsg(res):successMsg}));
          }

          if (errorMsg && _has(res,'data.error')) {
            dispatch(errorNotification({message:_isFunction(errorMsg)?errorMsg(res):errorMsg}));
          }


          return res;
        },
        error: function({ getState, dispatch, getSourceAction }, error) {

          var action = getSourceAction(error.config); //contains information about request object
          var errorMsg = _get(action, "payload.notify.error.message");

          if(action.payload.scope){
            dispatch(removeRequest(action.payload.scope))
          }

          if (errorMsg) {
            dispatch(errorNotification({message:_isFunction(errorMsg)?errorMsg(error):errorMsg}));
          }

          throw error;
        }
      }
    ]
  },


};

const X_CSRF_TOKEN = document.getElementById("csrf-token").getAttribute("content")

var baseAxiosConfig = {
    responseType: ["json"],
  headers: {
    "X-CSRF-TOKEN": X_CSRF_TOKEN,
  },
}

const defaultClient = axios.create({
  ...baseAxiosConfig,
  baseURL: "/api",
});

const webClient = axios.create({
  ...baseAxiosConfig,
})

const clients = {
  default:{client:defaultClient},
  web:{client:webClient},
}

const httpMiddleware = () => {
  return multiClientMiddleware(clients, middlewareConfig);
};

export default httpMiddleware;
