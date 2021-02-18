import React, { useEffect } from "react";
import {  Route, Redirect} from "react-router-dom";
import { useSelector ,useDispatch } from "react-redux";
import { activateAccount } from "../reducks/users/operations";
export const PrivateRoute = ({...props})=>{
  const userSelector = (state) =>state.users
  const user=useSelector(userSelector)
  const dispatch = useDispatch()
  const isActived = user.actived
  const authUser  = user.token
  const href = location.href
  // http://localhost:3001/?account_confirmation_success=true
  // signup?account_confirmation_success=true
  // console.log(/account_confirmation_success=true/.test(href));
  // console.log(localStorage.getItem("EP"));
  useEffect(()=>{
    const fetchActivateAccount= async ()=>{
      if (/account_confirmation_success=true/.test(href)) {
        if (localStorage.getItem("EP")&& localStorage.getItem("EE")) {
          await dispatch(activateAccount())
          return
        }
      }
    }
    fetchActivateAccount()
  },[location.href])

  if (/account_confirmation_success=true/.test(href)) {
    return (
      <div className="">Loadding...</div>
    )
  }
  if (authUser && isActived) {
    return(
      <Route  {...props}/>
    )
  }else{
    return(
       <Redirect to="/login"/>
    )
  }
}
