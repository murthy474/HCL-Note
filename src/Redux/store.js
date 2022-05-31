import { createStore, applyMiddleware } from 'redux'
// import logger from 'redux-logger'

import reducers from '../Redux/reducers'

const Store = createStore(
  reducers,applyMiddleware()
)

export default Store
