import React, { useEffect } from "react";
import { push } from "connected-react-router";
import { useSelector ,useDispatch } from "react-redux";

export const ConfirmationResetMail = ()=>{
  const userSelector = (state)=>state.users
  const actived = useSelector(userSelector).actived
  const dispatch = useDispatch()
  useEffect(()=>{
    if (actived) {
      dispatch(push("/"))
    }else if (localStorage.getItem("updatePassword")=="success") {
      dispatch(push("/login"))
    }
  },[])
  return(
    <div className="">メールを送りましたので、確認をしてください</div>
  )
}
