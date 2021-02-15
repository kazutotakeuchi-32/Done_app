import { initialState } from "../store/initialState"
import * as Actions from "./actions";
export const UsersReducer=(state=initialState.user,action)=>{
  switch (action.type) {
    case Actions.SIGN_UP:
      return {
       ...action.Payload.users
      }
    case Actions.INTIAL_USER:
      console.log("aa");

      return state
    default:
      return state
  }
}
