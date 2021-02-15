import { initialState } from "../store/initialState"
import * as Actions from "./actions";
export const UsersReducer=(state=initialState.user,action)=>{
  switch (action.type) {
    case Actions.SIGN_UP:
    case Actions.SIGN_IN:
    case Actions.SIGN_OUT:
      return {
       ...action.Payload.users
      }
    case Actions.INTIAL_USER:
      return  state

    default:
      return state
  }
}
