import { IUserA } from "../../models/User"
import actions from "./actions"

export interface UserState {
  data?: IUserA | null,
  loading?: boolean,
}

const initialState: UserState = {
  data: null,
  loading: false,
}

const reducer = (state = initialState, action: { type: string, payload: UserState }) => {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export default reducer