import actions from "./actions"

const initialState = {
  messages: [],
  users: [],
  loading: false
}

const reducer = (state = initialState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    case actions.UPDATE_MESSAGES:
      return { ...state, messages: [...state.messages, action.payload.message] }
    default:
      return state
  }
}

export default reducer