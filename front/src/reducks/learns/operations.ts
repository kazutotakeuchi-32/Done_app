import axios from "axios"
import { push } from "connected-react-router"
import { fetchPostLearingAction ,fetchGetLearnNextTasksAction} from "./actions"
export const fetchPostLearning=(vls)=>{
  const {uid,client,token,id} = JSON.parse(localStorage.redux).users
  const option={
    headers:{
      'client':client,
      'access-token':token,
      'uid':uid
    }
  }
  return async (dispatch)=>{
    vls.forEach(async (vl) => {
      const res = await axios.post("http://localhost:3000/api/v1/learns",{
        title:vl.title,
        content:vl.content,
        time:vl.time,
        subject:vl.subject,
        draft_learn_id:vl.id
      },option)
      if (res.status!=200) {
        return
      }
    });
    dispatch(push(""))
    // if (res.status==200) {
    //   dispatch(fetchPostLearingAction())
    //   push("/")
    // }
  }
}

export const  fetchGetLearnNextTasks = () =>{
  const {uid,client,token} = JSON.parse(localStorage.redux).users
  return async (dispatch)=>{
    const option={
      headers:{
        'client':client,
        'access-token':token,
        'uid':uid
        }
    }
   const res= await axios.get("http://localhost:3000/api/v1/learns/todays_task",option)
   const learns = res.data.data
   dispatch(fetchGetLearnNextTasksAction(learns))
  }
}
