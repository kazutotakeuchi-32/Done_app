import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useSelector ,useDispatch } from "react-redux";
import { adminSignOut, signOut } from "../../reducks/users/operations";
import { HamburgerMenu } from "./HamburgerMenu";
import { Drawer } from "./Drawer";
import { Contents } from "./Contents";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // flexGrow: 1,
      justifyContent:"space-between",
      minHeight:"0",
      [theme.breakpoints.down('xs')]:{
        display:"flex",
        position: "relative",
       },
    },
    header:{
      padding:"0 10%",
      backgroundColor:'white',
      display:"flex",
      [theme.breakpoints.down('xs')]:{
        padding:"0 "
       },
      // justifyContent:"center"
    },
    imgBox:{
      [theme.breakpoints.down('xs')]:{
        margin:"auto"
       },
    }
    ,
    img:{
      // marginTop:"10px",
      // marginLeft:"50px",
      // height:"40px"
      height: "35px",
      marginTop:"3px",
    },
    button:{
      // marginTop:"10px",
      display:"block",
      [theme.breakpoints.down('xs')]:{
        display:"none",
       },
    },
    buttonBox:{
      display:"flex",
      [theme.breakpoints.down('xs')]:{
        display:"none",
       },
    },
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      backgroundColor:"#333"
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    none:{
      display:"none"
    }
  }),
);

export const Header =():JSX.Element=>{
  const classes = useStyles();
  const [isOpen,setIsOpen]=useState(false)
  const [isLogin,setIsLogin]=useState(false)
  const [anchorEl,setAnchorEl]=useState(null)
  const open = Boolean(anchorEl)
  const userSelector = (state) =>state.users
  const user = useSelector(userSelector)
  const authUser  = user.token
  const isActived = user.actived
  const avatar = user.avatar
  const id = user.id
  const adminUser = user.admin
  const  dispatch= useDispatch()
  const toggleDrawer=(open:boolean):void=>{
    setIsOpen(open)
  }
  const handleClick=()=>{
    adminUser?
      dispatch(adminSignOut(user))
    :
      dispatch(signOut(user))
    setIsOpen(false)
  }
  const handleMenu = (e)=>{
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(()=>{
    if (authUser&&isActived) {
      setIsLogin(true)
    }else{
      setIsLogin(false)
    }
  },[isActived])
  return(
    <div className={isActived? "": classes.none}>
      <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Toolbar className={classes.root}>
        <Contents
            anchorEl={anchorEl}
            isLogin={isLogin}
            open={open}
            id={id}
            avatar={avatar}
            handleClick={handleClick}
            handleClose={handleClose}
            handleMenu={handleMenu}
          />
          <HamburgerMenu toggleDrawer={toggleDrawer}/>
          <Drawer
            id={id}
            isOpen={isOpen}
            isLogin={isLogin}
            toggleDrawer={toggleDrawer}
            handleClick={handleClick}
          />
        </Toolbar>
      </AppBar>
     </div>
    </div>
  )
}




//   <div className={classes.imgBox}>
//   <img src={Logo} alt="done" className={classes.img}/>
// </div>


//   isLogin ?
//   <div className={classes.buttonBox}>
//      <IconButton >
//       <SvgIcon  color="action">
//         <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
//       </SvgIcon>
//     </IconButton>
//     <IconButton >
//       <NotificationsIcon />
//     </IconButton>
//     <IconButton onClick={handleMenu}>
//       {
//         avatar!="" ?
//           <Avatar className={classes.small} alt="Remy Sharp"  src={avatar} />
//         :
//           <AccountCircle/>
//       }
//     </IconButton>
//     <Menu
//       id="menu-appbar"
//       anchorEl={anchorEl}
//       anchorOrigin={{
//         vertical: 'top',
//         horizontal: 'right',
//       }}
//       keepMounted
//       transformOrigin={{
//         vertical: 'top',
//         horizontal: 'right',
//       }}
//       open={open}
//       onClose={handleClose}
//     >
//       <MenuItem onClick={handleClose} ><Link href={`/users/${id}`}>マイページ</Link></MenuItem>
//       <MenuItem onClick={handleClose}><Link  href="/users/setting">アカウント設定</Link></MenuItem>
//       <MenuItem onClick={handleClick}>ログアウト</MenuItem>
//     </Menu>
//   </div>
// :
//   <div className={classes.buttonBox}>
//      <Button  className={classes.button} href="/signup">signup</Button>
//      <Button  className={classes.button} href="/login">Login</Button>
//   </div>
// }



 /* <SwipeableDrawer
            open={isOpen}
            onClose={()=>toggleDrawer(false)}
            onOpen={()=>toggleDrawer(true)}
          >
              <List className={classes.list}>
                { isLogin ?
                    ['Home', 'Mypage', 'Output', 'Setting',"Information","Logout"].map((text, index) =>{
                          if (text == "Logout") {
                            return(
                              <ListItem button key={text} onClick={()=>handleClick()}>
                                 <ListItemText primary={text} />
                              </ListItem>
                            )
                          }
                          return(
                          <ListItem button key={text}>
                            <ListItemText primary={text} />
                          </ListItem>
                          )
                        }
                      )
                  :
                    [{value:'Signup',url:'/signup'},{ value:'Login',url:'/login'}].map((contents, index) => (
                      <ListItem button key={index}  >
                        <Link href={contents.url}  >
                          <ListItemText  primary={contents.value} />
                        </Link>
                      </ListItem>
                    ))
                }
                <Divider/>
              </List>
          </SwipeableDrawer> */
