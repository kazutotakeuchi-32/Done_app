import React from "react";
import {  Route, Redirect} from "react-router-dom";
import { useSelector  } from "react-redux";
export const PrivateRoute = ({...props})=>{
  const userSelector = (state) =>state.users.token
  const authUser = useSelector(userSelector)
  if (authUser) {
    return(
      <Route  {...props}/>
    )
  }else{
    return(
       <Redirect to="/login"/>
    )
  }
}
