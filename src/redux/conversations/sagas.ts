import { Alert } from "react-native";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { getConversations } from "../../services/conversationService";
import actions from "./actions";

export function* GET_CONVERSATIONS(): any {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true,
    }
  })
  const res = yield call(getConversations);
  if (res?.error) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false,
      }
    })
    Alert.alert('Error', res?.message[0]);
  } else {
    yield put({
      type: actions.SET_STATE,
      payload: {
        listData: res?.data,
        loading: false,
      }
    })
  }
}

export default function* root() {
  yield all([
    takeEvery(actions.GET_CONVERSATIONS, GET_CONVERSATIONS),
  ])
}