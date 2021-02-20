import axios from "axios";
import { Cookies } from "react-cookie";
import {push} from "connected-react-router";
import { signUpAction ,
          signInAction,
          signOutAction,
          resetPasswordAction,
          activateAccountAction,
          updatePasswordAction
} from "../users/actions";

import { initialState } from "../store/initialState";
import crypto  from "crypto-js";
function userDatas(data,headers,type="SIGN_IN"){
    return  type== "SIGN_IN" || type=="ACTIVEATE_ACCOUNT" ?
        {
          id:data.id,
          name:data.name,
          avatar:data.avatar,
          admin:data.admin,
          client:headers['client'],
          uid:headers['uid'],
          token:headers['access-token'],
          actived:true,
          }
      :
          {
            id:data.id,
            name:data.name,
            avatar:data.avatar,
            admin:data.admin,
            client:"",
            uid:"",
            token:"",
            actived:false,
          }

  }

function encryptKey():string {
  return  "0123456789ABCDEF0123456789ABCDEF";
}
function  utf8_text(text:string)  {
  return crypto.enc.Utf8.parse(text);
}

export const signUp=(userName,email,password,confirmPassword)=>{
  return async (dispatch)=>{
    const res = await axios.post("http://localhost:3000/api/v1/auth",{
      name:userName,
      email:email,
      password:password,
      password_confirmation:confirmPassword,
      confirm_success_url:"http://localhost:3001/"
    })
    if (res.status == 200) {
      const headers = res.headers
      const data = res.data.data
      const user = {...userDatas(data,headers,"SIGN_UP")}
      const EK = encryptKey()
      const EP = crypto.AES.encrypt(utf8_text(password),EK).toString()
      const EE = crypto.AES.encrypt(utf8_text(email),EK).toString()
      console.log(EP,EE);
      localStorage.setItem("EP",EP)
      localStorage.setItem("EE",EE)
      dispatch(signUpAction({...user,actived:false}))
      dispatch(push('/confirmation/mail'))
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
      if (localStorage.getItem("updatePassword")) {
        localStorage.removeItem("updatePassword")
      }
      dispatch(push("/"))
    }else{
      return false
    }
  }
}

export const signOut=({uid,client,token})=>{
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
      uid:"",
      actived:false,
    }
    dispatch(signOutAction(user))
  }
}

export const resetPassword=(email)=>{
  return async (dispatch)=>{
    const res = await axios.post("http://localhost:3000/api/v1/auth/password",{
      email:email,
      redirect_url:"http://localhost:3001/confirmation/password"
    })
    if (res.status==200) {
      dispatch(resetPasswordAction())
      dispatch(push("/confirmation/reset"))
    }
  }
}

export const updatePassword=(password,confirmPassword,{token,uid,client})=>{
  const option={
    headers:{
      'client':client,
      'access-token':token,
      'uid':uid
    }
  }
  return async (dispatch)=>{
    const res = await axios.put("http://localhost:3000/api/v1/auth/password",{
      password:password,
      password_confirmation:confirmPassword
    },option)
    if (res.status==200) {
      dispatch(updatePasswordAction)
      dispatch(push("/login"))
      localStorage.setItem("updatePassword","success")
    }

  }

}
// curl localhost:3000/api/v1/auth/password -X
// POST -d '{"email":"kazutotakeuchi32@gmail.com",
// "redirect_url":"http://localhost:3001/"}

export const activateAccount = ()=>{
  const EP = localStorage.getItem("EP")
  const EE = localStorage.getItem("EE")
  const EK =encryptKey()
  const DP = crypto.AES.decrypt(EP,EK)
  const DE = crypto.AES.decrypt(EE,EK)
  localStorage.removeItem("EP")
  localStorage.removeItem("EE")
  const [DPS,DES] = [
      DP.toString(crypto.enc.Utf8),
      DE.toString(crypto.enc.Utf8)
  ]
  return async (dispatch)=>{
    const res = await axios.post("http://localhost:3000/api/v1/auth/sign_in",{
      email: DES,
      password:DPS,
    },{withCredentials : true})
    if (res.status==200) {
      const headers = res.headers
      const data = res.data.data
      const user = userDatas(data,headers,"ACTIVEATE_ACCOUNT")
      dispatch(activateAccountAction(user))
      dispatch(push("/"))
    }
  }
}

export const settingsAccount=(password,confirmPassword)=>{
  const {uid,client,token} = JSON.parse(localStorage.redux).users
  const option={
    headers:{
      'client':client,
      'access-token':token,
      'uid':uid
    }
  }
  return async(dispatch)=>{
    // PUT
    const res = axios.put("http://localhost:3000/api/v1/auth",{
      password:password,
      password_confirmation:confirmPassword
    },option)
  }
}
