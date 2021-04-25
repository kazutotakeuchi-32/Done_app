import { initialState } from "../store/initialState"
import {FETCH_GET_LEARNING, FETCH_POST_LEARNING,FETCH_GET_LEARN_NEXT_TASKS} from "../learns/actions"
export const LearnsReducer = (state=initialState.learns,action)=>{
  switch (action.type) {
    case FETCH_POST_LEARNING :
      return state
    case FETCH_GET_LEARNING:
      return {
        ...action.Payload.learns
      }
    case FETCH_GET_LEARN_NEXT_TASKS:
      return {
        ... state ,
        nextTasks:action.Payload.learns.nextTasks,
       }
    default:
      return {...state}
  }
}
