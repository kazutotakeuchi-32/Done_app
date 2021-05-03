
import axios from "axios"
import React, { useEffect, useState } from "react"
import { TabPanel } from "./TabPanel"
type Props ={
  value:number,
  index:number
}
export const TodaysTasks =(props:Props)=>{
  const {value,index} = props
  const [todaysTasks,setTodaysTasks] = useState<{data:any,title:string}>({data:[],title:""})

  useEffect(()=>{
    const getTasks = async ()=>{
     const res = await axios.get( "http://localhost:3000/api/v1/users/1/search?type=day")
     const {draftLearns:{search_tasks:todayTasks}} = res.data.data
     setTodaysTasks(todayTasks)
    }
    if (value==index) {
      getTasks()
    }
  },[value])


  return(
    <TabPanel index={index} value={value}>
      <div className="">
        {todaysTasks.title}
      </div>
    </TabPanel>
  )
}
