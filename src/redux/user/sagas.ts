import { ActionSheetIOS, Alert } from "react-native";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { login, register } from "../../services/authService";
import storageService from "../../services/storageService";
import { getMe } from "../../services/userService";
import actions from "./actions";

export function* LOGIN(payload: any): any {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true
    }
  })
  const token = yield call(login, payload.account)
  if (token) {
    storageService.set('token', token.token)
    yield put({
      type: actions.GET_CURRENT_USER
    })
    Alert.alert('Success', 'Login successful!')
    payload.callback && payload.callback()
  } else {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false
      }
    })
    Alert.alert('Fail', 'Login failed!')
  }
}

export function* GET_CURRENT_USER():any {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true
    }
  })
  const user = yield call(getMe)
  if (user) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        data: user,
        loading: false
      }
    })
  } else {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false
      }
    })
    Alert.alert('Fail', 'Cannot get current user')
  }
}

export function* REGISTER(payload: any): any {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true
    }
  })
  const status = yield call(register, payload.user)
  if (status) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false
      }
    })
    Alert.alert('Success', 'Register successful!')
    payload.callback && payload.callback()
  } else {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false
      }
    })
    Alert.alert('Fail', 'Register failed')
  }
}

export default function* root() {
  yield all([
    takeEvery(actions.LOGIN, LOGIN),
    takeEvery(actions.GET_CURRENT_USER, GET_CURRENT_USER)
  ])
}