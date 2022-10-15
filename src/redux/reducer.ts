import { combineReducers } from "redux"
import global from './global/reducers'
import user from './user/reducers'

const reducer = combineReducers({
  global,
  user
})

export default reducer