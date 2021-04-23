import React, { useEffect } from "react"
import { useDispatch,useSelector  } from "react-redux";
import { fetchGetNextTasks } from "../reducks/draft_learns/operations";
import { getUser } from "../reducks/users/operations";

export const Mypage = ()=>{
  const dispatch = useDispatch()
  const userSelector  = state=>state.users
  const learnSelector = state=>state.learns
  const {nextTasks,previousTasks} = useSelector(learnSelector)
  const {id,name}=useSelector(userSelector)
  useEffect(()=>{
    if (/users\/[0-1]/.test(location.href)!=null ) {
      const id =location.href.split("/")[4]
      dispatch(getUser(id))
    }
  },[])

  // const handleChange=()=>{
  // }
  // const handleChange=()=>{
  // }

  return(
    <div className="">
      mypage
      <div className="">
        <p>今日の予定</p>
        {/* {nextTasks.map((task,i)=>
            <div key={i}>
              <p >タスク:{task.title}</p>
              <p>学習時間:{task.time}</p>
              <p>種類：{task.subject}</p>
              <p>内容:{task.content}</p>
            </div>
          )
        } */}
      </div>
      <div className="">
        <p>グラフのデータ</p>
      </div>
    </div>
  )
}
