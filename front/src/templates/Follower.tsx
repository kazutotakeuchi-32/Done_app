import React, { useEffect, useState } from "react";
import { FollowTabPanel } from "./Followtabs";
import axios from "axios";
import { UsersList } from "./UsersList";
type Props={
  index:number,
  value:number,
  userId:string
}

export const Followers  = ({index,value,userId}:Props)=>{
  const[users,setUsers]=useState<any>([])
  const[message,setMessage]= useState<string>("")
  useEffect(()=>{
   const fetchFollowers=async()=>{
     const res =await axios.get(`http://localhost:3000/api/v1/users/${userId}/followers`)
     setUsers(res.data.data.followers)
     setMessage(res.data.data.message)
   }
   fetchFollowers()
  },[])
  return(
    <FollowTabPanel index={index} value={value}>
      {  users.length!=0 &&
        <UsersList users={users}/>
      }
      {  message!="" &&
        <div className="">{message}</div>
      }

    </FollowTabPanel>
  )
}
