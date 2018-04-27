import axios from "axios";
import _get from "lodash/get";
import config from "Config";
import { successNotification, errorNotification } from "Actions/notificationSystemActions";
import axiosMiddleware from "redux-axios-middleware";

const middlewareConfig = {
  interceptors: {
    request: [
      {
        success: function({ getState, dispatch, getSourceAction }, req) {
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

          if (notificationMsg) {
            dispatch(successNotification(notificationMsg));
          }

          return req;
        },
        error: function({ getState, dispatch, getSourceAction }, error) {

          var action = getSourceAction(error.config); //contains information about request object
          var notificationMsg = _get(action, "payload.notify.error");

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
  baseURL: config.appURL + "/api",
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
