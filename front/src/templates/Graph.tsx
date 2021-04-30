import React from "react"
import { TabPanel } from "./TabPanel";
import { BarGraph } from "../components/Graph/BarGraph";
import { PieGraph } from "../components/Graph/PieGraph";

type Props ={
  value:number,
  index:number
}

export const Graph = (props:Props)=>{
  const {value,index} = props
  return (
    <TabPanel value={value} index={index}>
      <BarGraph/>
      <PieGraph/>
    </TabPanel>
  )
}
