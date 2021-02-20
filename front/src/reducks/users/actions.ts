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

export const RESET_PASSWORD = "RESET_PASSWORD"
export const resetPasswordAction = ()=>{
  return({
    type:"RESET_PASSWORD"
  })
}

export const UPDATE_PASSWORD = "UPDATE_PASSWORD"
export const updatePasswordAction = (users)=>{
  return({
    type:"UPDATE_PASSWORD",
    Payload:{
      users
    }
  })
}

export const ACTIVATE_ACCOUNT = "ACTIVATE_ACCOUNT"
export const activateAccountAction= (users)=>{
  return(
    {
      type:"ACTIVATE_ACCOUNT",
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
