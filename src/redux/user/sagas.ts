import { ActionSheetIOS, Alert } from "react-native";
import { all, call, put, take, takeEvery } from "redux-saga/effects";
import { login, register, sendOTP, validateEmail, validateOTP } from "../../services/authService";
import storageService from "../../services/storageService";
import { getMe, updateUserProfile } from "../../services/userService";
import actions from "./actions";
import conversationActions from "../conversations/actions";

export function* LOGIN({ payload }: any): any {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true
    }
  })
  const res = yield call(login, payload.account)
  if (res?.token) {
    storageService.set('token', res.token)
    yield put({
      type: actions.GET_CURRENT_USER
    })
    if (payload.callback) yield call(payload.callback)
  } else if (res?.error) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false
      }
    })
    Alert.alert('Login failed!', res?.message[0] || 'Something went wrong!')
  }
}

export function* GET_CURRENT_USER({ payload }: any): any {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true
    }
  })
  const user = yield call(getMe)
  if (user?._id) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        data: user,
        loading: false
      }
    })
    yield put({
      type: conversationActions.GET_CONVERSATIONS
    })
    if (payload?.callback) yield call(payload.callback)
  } else {
    yield call(storageService.remove, 'token')
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false
      }
    })
    Alert.alert('Fail', 'Cannot get current user')
  }
}

export function* REGISTER({ payload }: any): any {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true
    }
  })
  const status = yield call(register, payload.user)
  if (status?.userId) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false
      }
    })
    Alert.alert('Success', 'Register successful!')
    if (payload.callback) yield call(payload.callback)
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

export function* LOGOUT({ payload }: any) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true
    }
  })
  yield call(storageService.remove, 'token')
  yield put({
    type: actions.SET_STATE,
    payload: {
      data: null,
      loading: false
    }
  })
  if (payload.callback) yield call(payload.callback)
}

export function* AUTO_LOGIN({ payload }: any): any {
  const token = yield call(storageService.get, 'token')
  if (token) {
    yield put({
      type: actions.GET_CURRENT_USER,
      payload: {
        callback: payload.callback || null
      }
    })
  }
}

export function* UPDATE_PROFILE({ payload }: any): any {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true
    }
  })
  const formData = new FormData()
  if (payload.data?.avatar) {
    formData.append('avatar', payload.data.avatar)
  }
  formData.append('fullname', payload.data.fullname)
  formData.append('yearOfBirth', payload.data.yearOfBirth)
  formData.append('phone', payload.data.phone)
  formData.append('about', payload.data.about)

  const res = yield call(updateUserProfile, payload.id, formData)
  if (res?._id) {
    res.avatarUrl += `&${new Date().getTime()}=0`
    yield put({
      type: actions.SET_STATE,
      payload: {
        data: res,
        loading: false
      }
    })
    Alert.alert('Success', 'Update profile successful!')
    if (payload.callback) yield call(payload.callback)
  } else {
    Alert.alert('Fail', 'Cannot update profile')
  }
}

export function* SEND_OTP({ payload }: any): any {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true
    }
  })
  const res = yield call(sendOTP, payload.data)
  if (res?.statusCode === 200) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false
      }
    })
    if (payload.callback) yield call(payload.callback)
  } else {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false
      }
    })
    Alert.alert('Fail', 'Cannot send OTP')
  }
}

export function* VALIDATE_OTP({ payload }: any): any {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true
    }
  })
  const res = yield call(validateOTP, payload.data)
  if (res?.statusCode === 200) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false
      }
    })
    if (payload.callback) yield call(payload.callback)
  } else {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false
      }
    })
    Alert.alert('Fail', 'Cannot validate OTP')
  }
}

export function* VALIDATE_EMAIL({payload}: any): any {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true
    }
  })
  const res = yield call(validateEmail, payload.data)
  console.log(res)
  if (res?.statusCode === 200) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false
      }
    })
    if (payload.callback) yield call(payload.callback)
  } else {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false
      }
    })
    Alert.alert('Fail', res?.message|| 'Cannot validate email')
  }
}

export default function* root() {
  yield all([
    takeEvery(actions.LOGIN, LOGIN),
    takeEvery(actions.GET_CURRENT_USER, GET_CURRENT_USER),
    takeEvery(actions.REGISTER, REGISTER),
    takeEvery(actions.LOGOUT, LOGOUT),
    takeEvery(actions.AUTO_LOGIN, AUTO_LOGIN),
    takeEvery(actions.UPDATE_PROFILE, UPDATE_PROFILE),
    takeEvery(actions.SEND_OTP, SEND_OTP),
    takeEvery(actions.VALIDATE_OTP, VALIDATE_OTP),
    takeEvery(actions.VALIDATE_EMAIL, VALIDATE_EMAIL)
  ])
}