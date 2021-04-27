import React from "react"
import { TabPanel } from "./TabPanel"
type Props ={
  value:number,
  index:number
}
export const UserSearch = (props:Props)=>{
  const {value,index} = props
  return(
    <TabPanel index={index} value={value}>
      <div className="">
        ユーザ検索
      </div>
    </TabPanel>
  )
}
