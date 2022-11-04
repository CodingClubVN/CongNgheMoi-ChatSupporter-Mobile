import { useSelector } from "react-redux";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { acceptFriendRequest, getFriendRequest, getFriends, sendFriendRequest } from "../../services/friendsService";
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
  console.log(res)

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
  console.log(res)

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
  console.log(res)

  yield put({
    type: actions.SET_STATE,
    payload: {
      friendRequest: res,
      loading: false,
    },
  })
}

export function* ACCEPT_FRIEND_REQUEST({ payload }: any): any {
  const friendRequest = useSelector((state: any) => state.friends.friendRequest)
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true,
    },
  })
  const res = yield call(acceptFriendRequest, payload.data)
  console.log(res)

  yield put({
    type: actions.SET_STATE,
    payload: {
      friendRequest: friendRequest.filter((item: any) => item._id !== payload.data._id),
      loading: false,
    },
  })

  yield put({
    type: actions.GET_FRIENDS
  })
}

export function* REJECT_FRIEND_REQUEST({ payload }: any): any {
  const friendRequest = useSelector((state: any) => state.friends.friendRequest)
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true,
    },
  })
  const res = yield call(acceptFriendRequest, payload.data)
  console.log(res)

  yield put({
    type: actions.SET_STATE,
    payload: {
      friendRequest: friendRequest.filter((item: any) => item._id !== payload.data._id),
      loading: false,
    },
  })
}

export default function* root() {
  yield all([
    takeEvery(actions.GET_FRIENDS, GET_FRIENDS),
    takeEvery(actions.GET_FRIEND_REQUEST, GET_FRIEND_REQUEST),
    takeEvery(actions.SEND_FRIEND_REQUEST, SEND_FRIEND_REQUEST),
    takeEvery(actions.ACCEPT_FRIEND_REQUEST, ACCEPT_FRIEND_REQUEST),
    takeEvery(actions.REJECT_FRIEND_REQUEST, REJECT_FRIEND_REQUEST),
  ])
}