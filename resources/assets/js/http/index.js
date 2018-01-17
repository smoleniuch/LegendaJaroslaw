import axios from 'axios'
import config from 'Config'

import axiosMiddleware from 'redux-axios-middleware'

const middlewareConfig = {
  interceptors: {
        request: [{
          success: function ({getState, dispatch, getSourceAction}, req) {
            console.log(req); //contains information about request object
            return req

          },
          error: function ({getState, dispatch, getSourceAction}, error) {
            console.log(error); //contains information about request object
            throw error


          }
        }
        ],
        response: [{
          success: function ({getState, dispatch, getSourceAction}, req) {
            console.log(req); //contains information about request object
            return req

          },
          error: function ({getState, dispatch, getSourceAction}, error) {
            console.log(error); //contains information about request object
            throw error
          }
        }
        ]
      }
}

const defaultClient = axios.create({

  baseURL: config.appURL + '/api',
  responseType: ['json'],
  headers: {

    'X-CSRF-TOKEN': document.getElementById('csrf-token').getAttribute('content')

  },




})

const httpMiddleware = () => {

  return axiosMiddleware(defaultClient, middlewareConfig)

}

export {
  httpMiddleware
}
