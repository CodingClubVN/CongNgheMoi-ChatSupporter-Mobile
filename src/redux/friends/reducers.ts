import actions from "./actions"

const initialState = {
  friends: [],
  friendRequest: [],
  requestSent: [],
  loading: false,
}

const reducer = (state = initialState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    case actions.UPDATE_FRIEND_REQUEST:
      return {
        ...state,
        friendRequest: [
          ...state.friendRequest,
          action.payload.friendRequest,
        ]
      }
    case actions.UPDATE_REQUEST_SENT:
      return {
        ...state,
        requestSent: [
          ...state.requestSent,
          action.payload.requestSent,
        ]
      }
    default:
      return state
  }
}

export default reducer