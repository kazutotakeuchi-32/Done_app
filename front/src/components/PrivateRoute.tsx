import React, { useEffect, useState } from "react"
import {  Route, Redirect} from "react-router-dom";
import { useDispatch,useSelector  } from "react-redux";
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
