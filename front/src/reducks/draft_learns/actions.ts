export const FETCH_POST_DRAFT_LEARNING = "FETCH_POST_DRAFT_LEARNING"
export const fetchPostDraftLearingAction = ()=>{
  return({
    type: "FETCH_POST_DRAFT_LEARNING"
  })
}
export const FETCH_GET_DRFT_LEARNING = "FETCH_GET_DRAFT_LEARNING"
export const fetchGetDraftLeaningAction =(draftLearns)=>{
  return({
    type:"FETCH_GET_DRAFT_LEARNING",
    Payload:{
      draftLearns
    }
  })
}

export const FETCH_GET_NEXT_TASKS = "FETCH_GET_NEXT_TASKS"
export const fetchGetNextTasksAction =(nextTasks)=>{
  return ({
    type:"FETCH_GET_NEXT_TASKS",
    Payload:{
      nextTasks
    }
  })
}
