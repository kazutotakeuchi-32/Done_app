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

export const ADMIN_SIGN_IN = "ADMIN_SIGN_IN"
export const adminSignInAction = (users)=>{
  return(
    {
      type:"ADMIN_SIGN_IN",
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

export const ADMIN_SIGN_OUT ="ADMIN_SIGN_OUT"
export const adminSignOutAction = (users)=>{
  return ({
    type: "ADMIN_SIGN_OUT",
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

export const SETTINGS_ACCOUNT = "SETTINGS_ACCOUNT"
export const settingsAccoutnAction = (users) => {
  return(
    {
      type:"SETTINGS_ACCOUNT",
      Payload:{
        users
      }
    }
  )
}

export const GET_USER="GET_USER"
export const getUserAction = (users)=>{
  return (
    {
      type:"GET_USER",
      Payload:{
        users
      }
    }
  )
}

export const FOLLOWING = "FOLLOWING"
export const followingAction =(follows)=>{
  return(
    {
      type:"FOLLOWING",
      Payload:{
        follows
      }
    }
  )
}

export const UNFOLLOW  = "UNFOLLOW"
export const unfollowAction=(follows)=>{
  return(
    {
      type:"UNFOLLOW",
      Payload:{
        follows
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
