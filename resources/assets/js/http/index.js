import axios from 'axios'
import config from 'Config'

import axiosMiddleware from 'redux-axios-middleware'

const defaultClient = axios.create({

  baseURL:config.appURL + '/api',
  responseType:'json'

})

const httpMiddleware = () => {

  return axiosMiddleware(defaultClient)

}

export {httpMiddleware}
