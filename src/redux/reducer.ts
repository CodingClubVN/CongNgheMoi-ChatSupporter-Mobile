import { combineReducers } from "redux"
import global from './global/reducers'
import user from './user/reducers'
import conversations from './conversations/reducers'
import users from './users/reducers'

const reducer = combineReducers({
  global,
  user,
  conversations,
  users
})

export default reducer