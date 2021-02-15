import { DateRange } from "@material-ui/icons";
import axios from "axios";
import {push,replace} from "connected-react-router";
import { signUpAction,initialUserAction } from "../users/actions";

export const signUp=(userName,email,password,confirmPassword)=>{
 return async (dispatch)=>{
    const res = await axios.post("http://localhost:3000/api/v1/auth",{
      name:userName,
      email:email,
      password:password,
      password_confirmation:confirmPassword
    })
    if (res.status == 200) {
      const client = res.headers['client'];
      const token = res.headers['access-token'];
      const uid = res.headers['uid']
      const data = res.data.data
      const user={
        id:data.id,
        name:data.name,
        avatar:data.avatar,
        admin:data.admin,
        client:client,
        uid:uid,
        token:token
      }
      dispatch(signUpAction(user))
      dispatch(push('/'))
    }else{
      return
    }
  }
}

// export const initialUser=()=>{
//   return (dispatch)=>dispatch(initialUserAction())
// }

// const signIn = async (email,password)=>{
//   console.log(email ,password);
//   const option={
//     headers:{
//       'Access-Control-Expose-Headers': 'X-Piyopiyo'
//     }
//   }
//   const res = await axios.post("http://localhost:3000/api/v1/auth/sign_in",{
//     email:email,
//     password:password,
//     include:["specs"],
//   },option)
//   console.log(res);

//   // if (res.status == 200) {
//   //   return res
//   // }else{
//   //   return false
//   // }
// }

// export const Login = (email,password)=>{
//   return (dispatch)=>{

//   }
// }

// export const resetPassword=()=>{
//   return (dispatch)=>{

//   }
// }
