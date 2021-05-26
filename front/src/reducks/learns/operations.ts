import axios from "axios"
import { push } from "connected-react-router"
import { number } from "yup/lib/locale"
import { API_ROOT } from "../../constants"
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
      const res = await axios.post(`${API_ROOT}/api/v1/learns`,{
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

export const  fetchGetLearnNextTasks = (id:number|null) =>  {
  const userId:number = id ? id :  JSON.parse(localStorage.redux).users.id
  return async (dispatch)=>{
    const res= await axios.get(`${API_ROOT}/api/v1/learns/todays_task?id=${userId}`,{
    })
    const learns = res.data.data
    dispatch(fetchGetLearnNextTasksAction(learns))

  }
}
