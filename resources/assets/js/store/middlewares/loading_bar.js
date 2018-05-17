import { loadingBarMiddleware as middleware } from 'react-redux-loading-bar'

export default function loadingBarMiddleware(){

  return middleware({
    promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAIL'],
    scope:'modal',
  })

}

// export default function loadingBarMiddleware(){

// }