import { initialState } from "../store/initialState";
import { FETCH_GET_DRFT_LEARNING,  FETCH_POST_DRAFT_LEARNING } from "./actions";

export const DraftLearnsReducer = (state=initialState.draftLearns,action)=>{
  switch (action.type) {
    case FETCH_POST_DRAFT_LEARNING :
      return state
    case FETCH_GET_DRFT_LEARNING:
      return {
        ...action.Payload.draft_learns
      }
    default:
      return {...state}
  }
}
