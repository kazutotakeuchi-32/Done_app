import axios from "axios";
import {push} from "connected-react-router";
import { signUpAction ,signInAction} from "../users/actions";
function userDatas(data,headers){
  return {
    id:data.id,
    name:data.name,
    avatar:data.avatar,
    admin:data.admin,
    client:headers['client'],
    uid:headers['uid'],
    token:headers['access-token']
  }
}

export const signUp=(userName,email,password,confirmPassword)=>{
  return async (dispatch)=>{
    const res = await axios.post("http://localhost:3000/api/v1/auth",{
      name:userName,
      email:email,
      password:password,
      password_confirmation:confirmPassword
    })
    if (res.status == 200) {
      const headers = res.headers
      const data = res.data.data
      const user = userDatas(data,headers)
      dispatch(signUpAction(user))
      dispatch(push('/'))
    }else{
      return
    }
  }
}

export const signIn =(email,password)=>{
  return async (dispatch)=>{
    const res = await axios.post("http://localhost:3000/api/v1/auth/sign_in",{
      email:email,
      password:password,
    })
    if (res.status == 200) {
      const headers = res.headers
      const data = res.data.data
      const user = userDatas(data,headers)
      dispatch(signInAction(user))
      dispatch(push("/"))
    }else{
      return false
    }
  }
}

// export const Login = (email,password)=>{
//   return (dispatch)=>{

//   }
// }
// export const resetPassword=()=>{
//   return (dispatch)=>{

//   }
// }
