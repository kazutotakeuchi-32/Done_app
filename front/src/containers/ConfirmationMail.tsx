import { push } from "connected-react-router";
import React, { useEffect } from "react";
import { useSelector ,useDispatch } from "react-redux";
import { Redirect} from "react-router-dom";

export const ConfirmationMail=()=>{
  const userSelector = (state) =>state.users
  const user=useSelector(userSelector)
  const actived = user.actived
  const dispatch = useDispatch()
  useEffect(()=>{
    if (actived) {
      dispatch(push("/"))
    }
  },[actived])
  return (
    <div className="">メールを送りましたので、確認をしてください</div>
  )
}
