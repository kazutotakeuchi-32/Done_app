import axios from "axios"
import { push } from "connected-react-router"
import { fetchPostDraftLearingAction } from "./actions"

export const fetchPostDraftLearning=(vls)=>{
  const {uid,client,token} = JSON.parse(localStorage.redux).users
  const option={
    headers:{
      'client':client,
      'access-token':token,
      'uid':uid
    }
  }
  console.log(vls);
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
