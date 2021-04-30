import { initialState } from "../store/initialState";
import { FETCH_GET_DRFT_LEARNING,  FETCH_GET_DRAFT_NEXT_TASKS,  FETCH_POST_DRAFT_LEARNING, FETCH_GET_DRAFT_PREVIOUS_TASKS } from "./actions";

export const DraftLearnsReducer = (state=initialState.draftLearns,action)=>{
  switch (action.type) {
    case FETCH_POST_DRAFT_LEARNING :
      return state
    case FETCH_GET_DRFT_LEARNING:
      return {
        ...state,
        nextTasks:action.Payload.draftLearns.nextTasks,
        previousTasks:action.Payload.draftLearns.previousTasks
      }
    case FETCH_GET_DRAFT_NEXT_TASKS:
      return {
       ... state ,
       nextTasks:action.Payload.draftLearns.nextTasks,
      }
    case FETCH_GET_DRAFT_PREVIOUS_TASKS:
      console.log(action.Payload.draftLearns);

      return {
        ...state,
        previousTasks:action.Payload.draftLearns,
      }
    default:
      return {...state}
  }
}
