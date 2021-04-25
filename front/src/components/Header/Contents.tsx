import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import  Logo from "../../assets/images/done.png";
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SvgIcon from '@material-ui/core/SvgIcon';
import {  Menu, MenuItem } from "@material-ui/core";
import { useDispatch  } from "react-redux";
import {push} from "connected-react-router";

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

type Props = {
  isLogin:boolean,
  open:boolean,
  id:any,
  avatar:any,
  anchorEl:any,
  handleClick:()=>void,
  handleMenu:(e:any)=>void,
  handleClose:()=>void
}

export const Contents = (props:Props)=>{
  const {isLogin,id,open,avatar,handleClick,handleClose,handleMenu,anchorEl} = props
  const classes  = useStyles()
  const dispatch = useDispatch()

  const pushToClose = (call,herf)=>{
    call()
    dispatch(push(herf))
  }

  return (
    <>
      <div className={classes.imgBox}>
            <img src={Logo} alt="done" className={classes.img}/>
      </div>
        {
          isLogin ?
            <div className={classes.buttonBox}>
              <IconButton onClick={()=>pushToClose(handleClose,`/`)} >
                <SvgIcon  color="action">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </SvgIcon>
              </IconButton>
              <IconButton >
                <NotificationsIcon />
              </IconButton>
              <IconButton onClick={handleMenu}>
                {
                  avatar!="" ?
                    <Avatar className={classes.small} alt="Remy Sharp"  src={avatar} />
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
                <MenuItem onClick={()=>pushToClose(handleClose,`/users/${id}`)} >マイページ</MenuItem>
                <MenuItem onClick={()=>pushToClose(handleClose,`/users/setting`)}>アカウント設定</MenuItem>
                <MenuItem onClick={handleClick}>ログアウト</MenuItem>
              </Menu>
            </div>
          :
            <div className={classes.buttonBox}>
               <Button  className={classes.button} href="/signup">signup</Button>
               <Button  className={classes.button} href="/login">Login</Button>
            </div>
        }
    </>
  )
}
