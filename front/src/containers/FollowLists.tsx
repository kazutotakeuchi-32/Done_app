import React, { useEffect } from "react"
import { useDispatch,useSelector  } from "react-redux";
import { Container, CssBaseline, Grid, makeStyles} from '@material-ui/core'
import { push } from 'connected-react-router'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Followtabs from "../templates/Followtabs";
import { Link } from "@material-ui/core";
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(7),
    alignItems: 'center',
    // boxShadow: '0px 3px 6px #0000001A',
    padding: '30px 50px',
    [theme.breakpoints.down('xs')]: {
      border: 'none',
      padding: '30px 0',
      boxShadow:"none",
      margin:"0"
    }
  }
}))

export const FollowLists = ()=>{
  const classes = useStyles()
  const userSelector=state=>state.users
  const { name: myName, id: myId, followings: myFollowing, followers: myFollowers } = useSelector(userSelector)
  const anotherUserString =localStorage.getItem("anotherUser")
  const dispatch=useDispatch()
  let anotherUser:any={}
  if (anotherUserString) {
     anotherUser = JSON.parse(anotherUserString)
  }
  return(
    <Container  component="main" maxWidth="xs" className={classes.paper}>
        <CssBaseline />
        <Link href={`/users/${location.href.split("/")[4]}`}>
        </Link>
        <div className="" style={{display:"flex",justifyContent:"spece-between",padding:"5px"}}>
          <div className=""
            style={{marginTop:"14px"}}
          >
            <IconButton style={{color:"royalblue"}} onClick={()=>dispatch(push(`/users/${location.href.split("/")[4]}`))}>
              <KeyboardBackspaceIcon />
            </IconButton>
          </div>
          <h1
            style={{marginLeft:"20px"}}
          >
            {anotherUser.name? anotherUser.name : myName}</h1>
        </div>
          <Grid item  sm={12}  style={{padding:0 }}>
              <Followtabs/>
          </Grid>
    </Container>
  )
}
