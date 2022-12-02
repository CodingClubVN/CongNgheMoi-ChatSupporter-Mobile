import { Alert } from "react-native";
import { all, call, put, select, take, takeEvery } from "redux-saga/effects";
import { addConversation, addUserToConversation, getConversations, removeUserFromConversation } from "../../services/conversationService";
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
        listData: res?.data.sort((a: any, b: any) => b.updatedAt - a.updatedAt),
        loading: false,
      }
    })
  }
}

export function* CREATE_CONVERSATION({ payload }: any): any {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true,
    }
  })
  const res = yield call(addConversation, payload.conversation);
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
      type: actions.GET_CONVERSATIONS,
    })
    Alert.alert('Success', 'Conversation created successfully');
    if (payload?.callback) yield call(payload.callback);
  }
}

export function* ADD_USER_CONVERSATION({ payload }: any): any {
  const res = yield call(addUserToConversation, payload.conversationId, payload.users)
  console.log(res)
  Alert.alert('Success', 'Add user success')
  yield put({
    type: actions.GET_CONVERSATIONS,
  })
}

export function* REMOVE_USER_CONVERSATION({ payload }: any): any {
  const res = yield call(removeUserFromConversation, payload.conversationId, payload.userId)
  console.log(res)
  Alert.alert('Success', 'Remove user success')
  yield put({
    type: actions.GET_CONVERSATIONS,
  })
}

export function* UPDATE_CONVERSATION({ payload }: any): any {
  let conversations = yield select((state: any) => state.conversations.listData);
  console.log(conversations)
  if (conversations.find((item: any) => item._id === payload.conversation._id)) {
    const index = conversations.findIndex((item: any) => item._id === payload.conversation._id);
    console.log(index)
    // remove old conversation
    conversations.splice(index, 1);
    conversations.unshift(payload.conversation);
    yield put({
      type: actions.SET_STATE,
      payload: {
        listData: conversations,
      }
    })
  } else {
    conversations.unshift(payload.conversation);
    yield put({
      type: actions.SET_STATE,
      payload: {
        listData: conversations,
      }
    })
  }
}

export default function* root() {
  yield all([
    takeEvery(actions.GET_CONVERSATIONS, GET_CONVERSATIONS),
    takeEvery(actions.CREATE_CONVERSATION, CREATE_CONVERSATION),
    takeEvery(actions.ADD_USER_CONVERSATION, ADD_USER_CONVERSATION),
    takeEvery(actions.REMOVE_USER_CONVERSATION, REMOVE_USER_CONVERSATION),
    takeEvery(actions.UPDATE_CONVERSATION, UPDATE_CONVERSATION)
  ])
}