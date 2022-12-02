import { all, call, put, select, takeEvery } from "redux-saga/effects";
import { acceptFriendRequest, cancelRequest, getFriendRequest, getFriends, rejectFriendRequest, sendFriendRequest } from "../../services/friendsService";
import actions from "./actions";
import userActions from '../users/actions'

export function* GET_FRIENDS(): any {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true,
    },
  })
  const res = yield call(getFriends)

  yield put({
    type: actions.SET_STATE,
    payload: {
      friends: res,
      loading: false,
    },
  })

}

export function* SEND_FRIEND_REQUEST({ payload }: any): any {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true,
    },
  })
  const res = yield call(sendFriendRequest, payload.data)

  if (res.statusCode === 200) {
    yield put({
      type: actions.UPDATE_REQUEST_SENT,
      payload: {
        requestSent: res
      },
    })

    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false,
      },
    })

    yield put({
      type: userActions.UPDATE_USER_FRIEND_STATUS,
      payload: {
        userId: payload.data.toUserId,
        type: 'request sent'
      }
    })
  }
}

export function* GET_FRIEND_REQUEST(): any {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true,
    },
  })
  const res = yield call(getFriendRequest)

  yield put({
    type: actions.SET_STATE,
    payload: {
      friendRequest: res,
      loading: false,
    },
  })
}

export function* ACCEPT_FRIEND_REQUEST({ payload }: any): any {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true,
    },
  })
  const res = yield call(acceptFriendRequest, payload.data)

  yield put({
    type: actions.GET_FRIEND_REQUEST,
  })

  yield put({
    type: actions.GET_FRIENDS
  })
}

export function* REJECT_FRIEND_REQUEST({ payload }: any): any {
  const friendRequest = yield select((state: any) => state.friends.friendRequest)
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true,
    },
  })
  const res = yield call(rejectFriendRequest, payload.data)
  if (res?.statusCode === 200) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        friendRequest: friendRequest.filter((item: any) => item?.fromUser?._id !== payload.data.fromUserId),
        loading: false,
      },
    })
  }
}

export function* CANCEL_REQUEST({ payload }: any): any {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true,
    },
  })
  const res = yield call(cancelRequest, payload.data)

  yield put({
    type: actions.GET_FRIENDS
  })
  if (payload.callback) yield call(payload.callback)
}

export function* UPDATE_FRIEND_REQUEST({ payload }: any): any {
  yield put({
    type: actions.GET_FRIEND_REQUEST,
  })
  // const friendRequest = yield select((state: any) => state.friends.friendRequest)
  // if (!friendRequest.find((item: any) => item?._id === payload.request._id)) {
  //   const newFriendRequest = [...friendRequest]
  //   newFriendRequest.unshift(payload.request)
  //   yield put({
  //     type: actions.SET_STATE,
  //     payload: {
  //       friendRequest: newFriendRequest,
  //       loading: false
  //     }
  //   })
  // }
}

export default function* root() {
  yield all([
    takeEvery(actions.GET_FRIENDS, GET_FRIENDS),
    takeEvery(actions.GET_FRIEND_REQUEST, GET_FRIEND_REQUEST),
    takeEvery(actions.SEND_FRIEND_REQUEST, SEND_FRIEND_REQUEST),
    takeEvery(actions.ACCEPT_FRIEND_REQUEST, ACCEPT_FRIEND_REQUEST),
    takeEvery(actions.REJECT_FRIEND_REQUEST, REJECT_FRIEND_REQUEST),
    takeEvery(actions.CANCEL_REQUEST, CANCEL_REQUEST),
    takeEvery(actions.UPDATE_FRIEND_REQUEST, UPDATE_FRIEND_REQUEST)
  ])
}