import React from "react"
import { useDispatch,useSelector  } from "react-redux";
import { push } from 'connected-react-router'
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
