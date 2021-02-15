export const SIGN_UP="SIGN_UP"
export const signUpAction=(users)=>{
  return(
    {
     type : "SIGN_UP",
     Payload:{
      users
     }
   }
  )
}
export const INTIAL_USER ="INTIAL_USER"

export const initialUserAction=()=>{
  return(
    {
     type : "INTIAL_USER",
   }
  )
}
