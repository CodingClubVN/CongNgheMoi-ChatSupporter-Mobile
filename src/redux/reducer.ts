import { combineReducers } from "redux"
import global from './global/reducers'
import user from './user/reducers'
import conversations from './conversations/reducers'

const reducer = combineReducers({
  global,
  user,
  conversations
})

export default reducer