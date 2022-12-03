import { Alert } from "react-native";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { forwardMessage, getMessagesOfConversation, recoverMessage, sendMediaMessageToConversation, sendMessageToConversation } from "../../services/messageService";
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
  yield call(console.log, messages)
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
  console.log('payload', payload)
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true
    }
  })
  let res = null
  // if (payload.message.type !== 'text') {
  console.log(payload.message.files)
  const formData = new FormData()
  for (file of payload.message.files) {
    formData.append('files', file)
  }
  formData.append('type', payload.message.type)
  formData.append('content', payload.message.content)
  if (payload.message.messageAnswarId) {
    formData.append('messageAnswarId', payload.message.messageAnswarId)
  }
  console.log('formData', formData.getAll('files'))
  res = yield call(sendMediaMessageToConversation, payload.conversationId, formData)
  // } else {
  // res = yield call(sendMessageToConversation, payload.conversationId, payload.message)
  // }
  console.log(res)
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

export function* RECOVER_MESSAGE({ payload }) {
  const res = yield call(recoverMessage, payload.messageId)
  if (res?.statusCode === 200) {
    Alert.alert('Success', 'Message recovered')
    yield put({
      type: actions.GET_MESSAGES,
      payload: {
        conversationId: payload.conversationId,
        callback: payload.callback
      }
    })
  } else {
    Alert.alert('Error', 'Cannot recover message')
  }
}

export function* FORWARD_MESSAGE({ payload }) {
  const res = yield call(forwardMessage, payload.messageId, payload.conversationId)
  console.log(res)
  if (res?.statusCode === 200) {
    Alert.alert('Success', 'Message forwarded')
    if (payload.callback) yield call(payload.callback)
  } else {
    Alert.alert('Error', 'Cannot forward message')
  }
}

export default function* root() {
  yield all([
    takeEvery(actions.GET_MESSAGES, GET_MESSAGES),
    takeEvery(actions.SEND_MESSAGE, SEND_MESSAGE),
    takeEvery(actions.SET_USERS, SET_USERS),
    takeEvery(actions.UPDATE_MESSAGES, UPDATE_MESSAGES),
    takeEvery(actions.RECOVER_MESSAGE, RECOVER_MESSAGE),
    takeEvery(actions.FORWARD_MESSAGE, FORWARD_MESSAGE)
  ])
}