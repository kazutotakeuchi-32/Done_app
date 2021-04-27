import React from "react"
import { TabPanel } from "./TabPanel"
type Props ={
  value:number,
  index:number
}
export const PastTasks = (props:Props)=>{
  const {value,index} = props
  return(
    <TabPanel index={index} value={value}>
      <div className="">
       過去のタスク
      </div>
    </TabPanel>
  )
}
