import React from "react"
import { TabPanel } from "./TabPanel"
type Props ={
  value:number,
  index:number
}
export const TimeLine =(props:Props)=>{
  const {value,index} = props
  return(
    <TabPanel index={index} value={value}>
      <div className="">
       タイムライン
      </div>
    </TabPanel>
  )
}
