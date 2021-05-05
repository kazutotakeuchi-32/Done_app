import axios from "axios"
import { push } from "connected-react-router"
import { fetchGetDraftNextTasksAction} from "./actions"

export const fetchPostDraftLearning=(vls)=>{
  const {uid,client,token} = JSON.parse(localStorage.redux).users
  const option={
    headers:{
      'client':client,
      'access-token':token,
      'uid':uid
    }
  }
  return async (dispatch)=>{
    vls.forEach(async (vl) => {
      const res = await axios.post("http://localhost:3000/api/v1/draft_learns",{
        title:vl.title,
        content:vl.content,
        time:vl.time,
        subject:vl.subject
      },option)
      if (res.status!=200) {
        return
      }
    });
    dispatch(push(""))
    // if (res.status==200) {
    //   dispatch(fetchPostDraftLearingAction())
    //   push("/")
    // }
  }
}

export const fetchGetDraftNextTasks = (id:number|null)=>{
  const userId:number =  id ?  id : JSON.parse(localStorage.redux).users.id
  return async (dispatch)=>{
   const res= await axios.get(`http://localhost:3000/api/v1/draft_learns/todays_task?id=${userId}`)
   const draftLearns = res.data.data
    dispatch(fetchGetDraftNextTasksAction(draftLearns))
  }
}
