import React from "react";
import {  useDispatch} from "react-redux";
import { settingsAccount } from "../reducks/users/operations";
export const Setting = ()=>{
  const dispatch = useDispatch()
  const handleSubmit=(values)=>{
    dispatch(settingsAccount(values.password,values.confirmPassword))
  }
  return(
    <div className="">設定</div>
  )
}
