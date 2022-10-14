import actions from "./actions"

const initialState = {

}

const reducer = (state = initialState, action: { type: string, payload: any}) => {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export default reducer