import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import global from './global/sagas'
import me from './me/sagas'

export default function* sagas() {
  yield all([
    global(),
    me()
  ])
}