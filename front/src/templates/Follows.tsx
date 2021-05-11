import React, { useEffect, useState } from "react";
import { FollowTabPanel } from "./Followtabs";
import axios from "axios";
import { UsersList } from "./UsersList";

type Props={
  index:number,
  value:number,
  userId:string
}

export const Follows  = ({index,value,userId}:Props)=>{
  const[users,setUsers]=useState<any>([])
  const[message,setMessage]= useState<string>("")
  useEffect(()=>{
   const fetchFollows=async()=>{
     const res =await axios.get(`http://localhost:3000/api/v1/users/${userId}/follows`)
     setUsers(res.data.data.followings)
     setMessage(res.data.data.message)
   }
   fetchFollows()
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
