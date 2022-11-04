import { combineReducers } from "redux"
import global from './global/reducers'
import user from './user/reducers'
import conversations from './conversations/reducers'
import users from './users/reducers'
import messages from './messages/reducers'
import friends from './friends/reducers'

const reducer = combineReducers({
  global,
  user,
  conversations,
  users,
  messages,
  friends,
})

export default reducer