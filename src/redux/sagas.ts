import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import global from './global/sagas'
import user from './user/sagas'
import conversations from './conversations/sagas'
import users from './users/sagas'
import messages from './messages/sagas'
import friends from './friends/sagas'

export default function* sagas() {
  yield all([
    global(),
    user(),
    conversations(),
    users(),
    messages(),
    friends(),
  ])
}