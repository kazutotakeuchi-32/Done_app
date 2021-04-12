import { initialState } from "../store/initialState"
import {FETCH_POST_DRAFT_LEARNING} from "../learns/actions"

export const LearnsReducer = (state=initialState.learns,action)=>{
  switch (action.type) {
    case FETCH_POST_DRAFT_LEARNING :
      return state
    default:
      return state
  }
}
