import { combineReducers } from "redux"
import global from './global/reducers'
import me from './me/reducers'

const reducer = combineReducers({
  global,
  me
})

export default reducer