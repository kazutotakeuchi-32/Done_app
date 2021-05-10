import { isDoStatement } from "typescript";
import { initialState } from "../store/initialState"
import * as Actions from "./actions";
export const UsersReducer=(state=initialState.user,action)=>{
  switch (action.type) {
    case Actions.SIGN_UP:
    case Actions.SIGN_IN:
    case Actions.SIGN_OUT:
    case Actions.ADMIN_SIGN_IN:
    case Actions.ADMIN_SIGN_OUT:
    case Actions.ACTIVATE_ACCOUNT:
    case Actions.UPDATE_PASSWORD:
    case Actions.SETTINGS_ACCOUNT:
      return {
       ...action.Payload.users
      }
    case Actions.GET_USER:
      return{
        ...state,
        id:action.Payload.users.id,
        name:action.Payload.users.name,
        followings:action.Payload.users.followings,
        followers:action.Payload.users.followers
      }
    case Actions.FOLLOWING:
    case Actions.UNFOLLOW:
      return{
        ...state,
        followings:action.Payload.follows.followings,
        followers:action.Payload.follows.followers
      }
    case Actions.INTIAL_USER:
    case Actions.RESET_PASSWORD:
      return  state
    default:
      return state
  }
}
