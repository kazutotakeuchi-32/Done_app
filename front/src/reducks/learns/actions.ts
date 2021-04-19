export const FETCH_POST_DRAFT_LEARNING = "FETCH_POST_DARAFT_LEARNING"
export const fetchPostDraftLearingAction = ()=>{
  return({
    type: "FETCH_POST_DARAFT_LEARNING"
  })
}
export const FETCH_GET_LEARNING = "FETCH_GET_LEARNING"
export const fetchGetLeaning =(learns)=>{
  return({
    type:"FETCH_GET_LEARNING",
    Payload:{
      learns
    }
  })
}
