import axios from "axios";
import { Cookies } from "react-cookie";
// import cookie from "js-cookie";
import {push} from "connected-react-router";
import { signUpAction ,signInAction,signOutAction} from "../users/actions";
import { initialState } from "../store/initialState";

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
    },{withCredentials : true})
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


export const signOut=({uid,client,token})=>{
  // const userSelector = (state) =>state.users
  // const user = useSelector(userSelector)
  // const uid = user.uid
  // const client = user.client
  // const token = user.token
  const option ={
    headers:{
      'client':client,
      'access-token':token,
      'uid':uid
    }
  }
  return async(dispatch)=>{
   const res= await axios.delete("http://localhost:3000/api/v1/auth/sign_out",option)
    console.log(res);
    const user ={
      id: null,
      name:"",
      email:"",
      avatar:"",
      admin:false,
      client:null,
      token:null,
      uid:""
    }
    dispatch(signOutAction(user))
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
