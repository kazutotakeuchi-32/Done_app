export const FETCH_POST_DRAFT_LEARNING = "FETCH_POST_DRAFT_LEARNING"
export const fetchPostDraftLearingAction = ()=>{
  return({
    type: "FETCH_POST_DRAFT_LEARNING"
  })
}
export const FETCH_GET_DRFT_LEARNING = "FETCH_GET_DRAFT_LEARNING"
export const fetchGetDraftLeaning =(draft_learns)=>{
  return({
    type:"FETCH_GET_DRAFT_LEARNING",
    Payload:{
      draft_learns
    }
  })
}
