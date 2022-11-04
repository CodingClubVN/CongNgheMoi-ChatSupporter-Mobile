import actions from "./actions"

const initialState = {
  data: [],
  loading: false
}

const reducer = (state = initialState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    case actions.UPDATE_USER_FRIEND_STATUS:
      const { userId } = action.payload
      const data = state.data.map((user: any) => {
        if (user._id === userId) {
          return {
            ...user,
            friendRequestStatus: action.payload.type
          }
        }
        return user
      })
      return {
        ...state,
        data
      }
    default:
      return state
  }
}

export default reducer