import { initialState } from "../store/initialState"

export const UsersReducer=(state=initialState.users,action)=>{
  switch (action.type) {
    case "":
      break;
    default:
      return state
  }
}
