import { all, call, put, takeEvery } from "redux-saga/effects";
import { getUsers } from "../../services/userService";
import actions from "./actions";

export function* GET_USERS({ payload }: any): any {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true,
    },
  })
  const users = yield call(getUsers, payload)
  yield put({
    type: actions.SET_STATE,
    payload: {
      data: users.data,
      loading: false,
    },
  })
}

export default function* root() {
  yield all([
    takeEvery(actions.GET_USERS, GET_USERS),
  ])
}