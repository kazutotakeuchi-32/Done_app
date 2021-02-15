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
  let logged = false
   logged = false
  const isAccountImage = true
  const toggleDrawer=(open:boolean):void=>{
    setIsOpen(open)
  }

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
                { logged ?
                    ['Home', 'Mypage', 'Output', 'Setting',"Information","Logout"].map((text, index) => (
                      <ListItem button key={text}>
                        <ListItemText primary={text} />
                      </ListItem>
                      ))
                  :
                    ['Signup', 'Login'].map((text, index) => (
                      <ListItem button key={text}>
                        <ListItemText primary={text} />
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
            logged ?
            <div className={classes.buttonBox}>
               <IconButton >
                <SvgIcon  color="action">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </SvgIcon>
              </IconButton>
              <IconButton >
                <NotificationsIcon />
              </IconButton>
              {
              isAccountImage ?
                <IconButton>
                  <Avatar className={classes.small} alt="Remy Sharp"  src={Img} />
                </IconButton>
              :
                <IconButton >
                  <AccountCircle/>
                </IconButton>
              }
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
