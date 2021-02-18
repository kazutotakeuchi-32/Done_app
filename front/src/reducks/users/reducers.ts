import { initialState } from "../store/initialState"
import * as Actions from "./actions";
export const UsersReducer=(state=initialState.user,action)=>{
  switch (action.type) {
    case Actions.SIGN_UP:
    case Actions.SIGN_IN:
    case Actions.SIGN_OUT:
    case Actions.ACTIVATE_ACCOUNT:
      return {
       ...action.Payload.users
      }
    case Actions.INTIAL_USER:
      return  state
    case Actions.RESET_PASSWORD:
      return action.types
    default:
      return state
  }
}
