import React from "react"
import {  Router, Redirect} from "react-router-dom";
export const PrivateRoute = ({...props})=>{
  const authUser = false
  const isAuthenticated =  null
  if (isAuthenticated) {
    return(
      <Router {...props}/>
    )
  }else{
    return(
       <Redirect to="/login"/>
    )
  }

}
