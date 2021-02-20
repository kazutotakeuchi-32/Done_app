import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import  Logo from "../../assets/images/done.png";
import  Img from "../../assets/images/_h21AB7G.jpg";
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SvgIcon from '@material-ui/core/SvgIcon';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useSelector ,useDispatch } from "react-redux";
import { signOut } from "../../reducks/users/operations";
import { Link, Menu, MenuItem } from "@material-ui/core";

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
    menuButton: {
      marginRight: theme.spacing(2),
      color:"#333",
      margin:0,
      MarginRight:0,
      display:"none",
      [theme.breakpoints.down('xs')]:{
        display:"block",
        position: "absolute",
        top: "50%",
        left: "1.2rem",
        transform:"translateY(-50%)",
       },
      // [theme.breakpoints.up('md')]: {
      //     backgroundColor: theme.palette.primary.main,
      //  },
      // [theme.breakpoints.up('lg')]: {
      //     backgroundColor: "green",
      // },
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
  const isAccountImage = false
  const  dispatch= useDispatch()
  const toggleDrawer=(open:boolean):void=>{
    setIsOpen(open)
  }

  const handleClick=()=>{
    dispatch(signOut(user))

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
    <div className="">
      <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Toolbar className={classes.root}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={()=>toggleDrawer(true)}
            >
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
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
          </SwipeableDrawer>
          <div className={classes.imgBox}>
            <img src={Logo} alt="done" className={classes.img}/>
          </div>
          {
            isLogin ?
            <div className={classes.buttonBox}>
               <IconButton >
                <SvgIcon  color="action">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </SvgIcon>
              </IconButton>
              <IconButton >
                <NotificationsIcon />
              </IconButton>
              <IconButton onClick={handleMenu}>
                {
                  isAccountImage ?
                    <Avatar className={classes.small} alt="Remy Sharp"  src={Img} />
                  :
                    <AccountCircle/>
                }
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClick}>Logout</MenuItem>
              </Menu>
            </div>
          :
            <div className={classes.buttonBox}>
               <Button  className={classes.button} href="/signup">signup</Button>
               <Button  className={classes.button} href="/login">Login</Button>
            </div>
          }
        </Toolbar>
      </AppBar>
     </div>
    </div>
  )
}
