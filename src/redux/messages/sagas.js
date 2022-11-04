import { Alert } from "react-native";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { getMessagesOfConversation, sendMediaMessageToConversation, sendMessageToConversation } from "../../services/messageService";
import actions from "./actions";

export function* GET_MESSAGES({ payload }) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true
    }
  })
  const messages = yield call(getMessagesOfConversation, payload.conversationId)
  if (messages.error) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false
      }
    })
    Alert.alert('Error', 'Cannot fetch messages')
    return
  }
  yield put({
    type: actions.SET_STATE,
    payload: {
      messages: messages.reverse(),
      loading: false
    }
  })
  if (payload.callback) yield call(payload.callback)
}

export function* SEND_MESSAGE({ payload }) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true
    }
  })
  let res = null
  if (payload.message.type !== 'text') {
    console.log(payload.message.file)
    const formData = new FormData()
    formData.append('file', {
      uri: payload.message.file.uri,
      type: payload.message.file.type,
      name: payload.message.file.name
    })
    formData.append('type', payload.message.type)
    res = yield call(sendMediaMessageToConversation, payload.conversationId, formData)
  } else {
    res = yield call(sendMessageToConversation, payload.conversationId, payload.message)
  }
  if (res?.error || res?.statusCode === 500) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false
      }
    })
    Alert.alert('Error', 'Cannot send message')
    return
  }
  // yield put({
  //   type: actions.UPDATE_MESSAGES,
  //   payload: {
  //     loading: false,
  //     message: {
  //       ...payload.message,
  //       _id: res.messageId
  //     }
  //   }
  // })
  if (payload.callback) yield call(payload.callback)
}

export function* SET_USERS({ payload }) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      users: payload.users
    }
  })
}

export function* UPDATE_MESSAGES({ payload }) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      message: payload.message
    }
  })
  if (payload.callback) yield call(payload.callback)
}

export default function* root() {
  yield all([
    takeEvery(actions.GET_MESSAGES, GET_MESSAGES),
    takeEvery(actions.SEND_MESSAGE, SEND_MESSAGE),
    takeEvery(actions.SET_USERS, SET_USERS),
    takeEvery(actions.UPDATE_MESSAGES, UPDATE_MESSAGES)
  ])
}