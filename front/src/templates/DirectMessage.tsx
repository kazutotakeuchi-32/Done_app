import React from "react"
import { TabPanel } from "./TabPanel"
type Props ={
  value:number,
  index:number
}
export const DirectMessage=(props:Props)=>{
  const {value,index} = props
  return(
    <TabPanel index={index} value={value}>
      <div className="">
       DM
      </div>
    </TabPanel>
  )
}
