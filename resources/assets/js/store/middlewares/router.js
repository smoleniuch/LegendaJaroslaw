import { history } from 'Router'
import { routerMiddleware } from 'react-router-redux'


const middleware = routerMiddleware(history)

export default middleware
