export const FETCH_POST_LEARNING = "FETCH_POST_LEARNING"
export const fetchPostLearingAction = ()=>{
  return({
    type: "FETCH_POST_LEARNING"
  })
}
export const FETCH_GET_LEARNING = "FETCH_GET_LEARNING"
export const fetchGetLeaningAction =(learns)=>{
  return({
    type:"FETCH_GET_LEARNING",
    Payload:{
      learns
    }
  })
}
