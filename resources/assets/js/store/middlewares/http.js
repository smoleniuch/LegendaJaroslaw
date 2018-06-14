import axios from "axios";
import _get from "lodash/get";
import _set from "lodash/set";
import _cloneDeep from "lodash/cloneDeep";
import config from "Config";
import { successNotification, errorNotification } from "Actions/notificationSystemActions";
import { addRequest, removeRequest } from "Actions/activeRequestActions";
import axiosMiddleware from "redux-axios-middleware";
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
        success: function({ getState, dispatch, getSourceAction }, req) {
          var action = getSourceAction(req.config); //contains information about request object
          var notificationMsg = _get(action, "payload.notify.success");

          if(action.payload.scope){
            dispatch(removeRequest(action.payload.scope))
          }

          if (notificationMsg) {
            dispatch(successNotification(notificationMsg));
          }

          return req;
        },
        error: function({ getState, dispatch, getSourceAction }, error) {

          var action = getSourceAction(error.config); //contains information about request object
          var notificationMsg = _get(action, "payload.notify.error");

          if(action.payload.scope){
            dispatch(removeRequest(action.payload.scope))
          }

          if (notificationMsg) {
            dispatch(errorNotification(notificationMsg));
          }

          throw error;
        }
      }
    ]
  }
};

const defaultClient = axios.create({
  baseURL: window.location.hostname + "/api",
  responseType: ["json"],
  headers: {
    "X-CSRF-TOKEN": document
      .getElementById("csrf-token")
      .getAttribute("content")
  }
});

const httpMiddleware = () => {
  return axiosMiddleware(defaultClient, middlewareConfig);
};

export default httpMiddleware;
