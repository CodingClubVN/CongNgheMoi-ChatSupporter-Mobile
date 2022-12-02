import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { all, call, put, select, take, takeEvery, takeLeading } from "redux-saga/effects";
import { addConversation, addUserToConversation, getConversation, getConversations, leaveConversation, removeUserFromConversation, updateConversation, updateUserRole } from "../../services/conversationService";
import actions from "./actions";

export function* GET_CONVERSATIONS(): any {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true,
    }
  })
  const res = yield call(getConversations);
  console.log(res)
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
  if (res?.statusCode === 200) {
    yield put({
      type: actions.GET_CONVERSATION_BY_ID,
      payload: {
        conversationId: payload.conversationId,
        callback: payload.callback
      }
    })
    Alert.alert('Success', 'Add user success')
  } else {
    Alert.alert('Error', res?.error);
  }
}

export function* REMOVE_USER_CONVERSATION({ payload }: any): any {
  const res = yield call(removeUserFromConversation, payload.conversationId, payload.userId)
  if (res?.statusCode === 200) {
    Alert.alert('Success', 'Remove user success')
    yield put({
      type: actions.GET_CONVERSATION_BY_ID,
      payload: {
        conversationId: payload.conversationId,
        callback: payload.callback
      }
    })
    yield put({
      type: actions.GET_CONVERSATIONS,
    })
    Alert.alert('Success', 'Remove user success')
  } else {
    Alert.alert('Error', res?.error);
  }
}

export function* UPDATE_CONVERSATION({ payload }: any): any {
  let conversations = yield select((state: any) => state.conversations.listData);
  if (conversations.find((item: any) => item._id === payload.conversation._id)) {
    const index = conversations.findIndex((item: any) => item._id === payload.conversation._id);
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

export function* CHECK_CONVERSATION_EXIST({ payload }: any): any {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true,
    }
  })
  const conversations = yield select((state: any) => state.conversations.listData);
  const listDirects = conversations.filter((item: any) => item.users.length === 2);
  const conversation = listDirects.find((item: any) => {
    const users = item.users.map((user: any) => user._id);
    return users.includes(payload.userId) && users.includes(payload.currentUserId);
  });
  if (conversation) {
    payload.callback(conversation.users, conversation.users.length > 2 ? 'group' : 'direct', conversation);
  } else {
    yield put({
      type: actions.CREATE_CONVERSATION,
      payload: {
        conversation: {
          conversationName: payload.conversationName,
          arrayUserId: [payload.userId],
        },
        callback: payload.callback2
      }
    })
  }
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: false,
    }
  })
}

export function* UPDATE_CONVERSATION_NAME({ payload }: any): any {
  const res = yield call(updateConversation, payload.conversationId, payload.conversationName);
  if (res?._id) {
    if (payload?.callback) yield call(payload.callback);
    yield put({
      type: actions.GET_CONVERSATIONS
    })
    yield put({
      type: actions.GET_CONVERSATION_BY_ID,
      payload: {
        conversationId: payload.conversationId
      }
    })
    Alert.alert('Success', 'Update conversation name success');
  } else {
    Alert.alert('Error', res?.error);
  }
}

export function* GET_CONVERSATION_BY_ID({ payload }: any): any {
  const conversation = yield call(getConversation, payload.conversationId);
  console.log('conversation', conversation)
  if (conversation?._id) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        selectedConversation: conversation,
      }
    })
    if (payload?.callback) yield call(payload.callback);
  }
}

export function* LEAVE_CONVERSATION({ payload }: any): any {
  const res = yield call(leaveConversation, payload.conversationId);
  if (res?.statusCode === 200) {
    yield put({
      type: actions.GET_CONVERSATIONS,
    })
    Alert.alert('Success', 'Leave conversation success');
    if (payload?.callback) yield call(payload.callback);
  } else {
    Alert.alert('Error', res?.error);
  }
}

export function* UPDATE_USER_ROLE({ payload }: any): any {
  const res = yield call(updateUserRole, payload.conversationId, payload.data);
  if (res?.statusCode === 200) {
    yield put({
      type: actions.GET_CONVERSATION_BY_ID,
      payload: {
        conversationId: payload.conversationId,
        callback: payload.callback
      }
    })
    Alert.alert('Success', 'Update user role success');
  } else {
    Alert.alert('Error', res?.error);
  }
}

export default function* root() {
  yield all([
    takeEvery(actions.GET_CONVERSATIONS, GET_CONVERSATIONS),
    takeEvery(actions.CREATE_CONVERSATION, CREATE_CONVERSATION),
    takeEvery(actions.ADD_USER_CONVERSATION, ADD_USER_CONVERSATION),
    takeEvery(actions.REMOVE_USER_CONVERSATION, REMOVE_USER_CONVERSATION),
    takeEvery(actions.UPDATE_CONVERSATION, UPDATE_CONVERSATION),
    takeEvery(actions.CHECK_CONVERSATION_EXIST, CHECK_CONVERSATION_EXIST),
    takeEvery(actions.UPDATE_CONVERSATION_NAME, UPDATE_CONVERSATION_NAME),
    takeEvery(actions.GET_CONVERSATION_BY_ID, GET_CONVERSATION_BY_ID),
    takeEvery(actions.LEAVE_CONVERSATION, LEAVE_CONVERSATION),
    takeEvery(actions.UPDATE_USER_ROLE, UPDATE_USER_ROLE),
  ])
}