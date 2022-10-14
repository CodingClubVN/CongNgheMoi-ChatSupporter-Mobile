import { IUserA } from "../../models/User"
import actions from "./actions"

export interface MeState {
  data?: IUserA | null,
  loading?: boolean,
}

const initialState: MeState = {
  data: null,
  loading: false
}

const reducer = (state = initialState, action: { type: string, payload: MeState}) => {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    case actions.CLEAR_STATE:
      return { ...initialState }
    default:
      return state
  }
}

export default reducer