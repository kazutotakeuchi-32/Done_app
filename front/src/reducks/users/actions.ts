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
export const SIGN_IN = "SIGN_IN"
export const signInAction = (users)=>{
  return(
    {
      type:"SIGN_IN",
      Payload:{
        users
      }
    }
  )
}

export const SIGN_OUT = "SIGN_OUT"
export const signOutAction = (users)=>{
  return({
    type: "SIGN_OUT",
    Payload:{
      users
    }
  })
}

export const INTIAL_USER ="INTIAL_USER"

export const initialUserAction=()=>{
  return(
    {
     type : "INTIAL_USER",
   }
  )
}
