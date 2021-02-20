import { initialState } from "../store/initialState"
import * as Actions from "./actions";
export const UsersReducer=(state=initialState.user,action)=>{
  switch (action.type) {
    case Actions.SIGN_UP:
    case Actions.SIGN_IN:
    case Actions.SIGN_OUT:
    case Actions.ACTIVATE_ACCOUNT:
    case Actions.UPDATE_PASSWORD:
      return {
       ...action.Payload.users
      }
    case Actions.INTIAL_USER:
    case Actions.RESET_PASSWORD:
    case Actions.SETTINGS_ACCOUNT:
      return  state
    default:
      return state
  }
}
