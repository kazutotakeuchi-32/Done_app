import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// import  Logo from "../../assets/images/done.png";
// import  Img from "../../assets/images/_h21AB7G.jpg";
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
import { Link, Menu, MenuItem, Typography } from "@material-ui/core";
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // height:"10px",
      // zIndex:10,
      top:"auto",
      // backgroundColor:"#222",
      // flexGrow: 1,
      // justifyContent:"space-between",
      minHeight:"0",
      [theme.breakpoints.down('xs')]:{
        display:"flex",
        position: "relative",
       },
    },
    drawer: {
      top:"auto",
      // backgroundColor:"none",
      [theme.breakpoints.up('sm')]: {
        // width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
      },
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    paper:{
      top:"auto",
      backgroundColor:" #2f353a"
    },
    paperAnchorDockedLeft:{
      borderRight: '1px solid rgba(0, 0, 0, 0.12)'
    },
    toolbar: theme.mixins.toolbar,
    body1:{
      color:"white",
      fontSize:"1.3rem"
    }
  }),
);

export const Sidbar = ()=>{
  const classes = useStyles()
  return(
      <nav className={classes.root}>
         <Hidden xsDown implementation="css" >
              <Drawer
                variant="permanent"
                open
                classes={{
                  paper: classes.paper,
                  paperAnchorDockedLeft:classes.paperAnchorDockedLeft
                }

                }
              >
                <div className={ classes.body1}>
                  {/* <Typography variant={"h6"}  >
                    メニュー
                  </Typography> */}

                <Divider/>
                <List  >
                  {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text} >
                      <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                      <ListItemText primary={text} disableTypography={true} >

                      </ListItemText>

                    </ListItem>
                  ))}
                </List>
                <Divider />
                <List>
                  {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem  key={text} >
                      <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                      <ListItemText primary={text} disableTypography={true} />
                    </ListItem>
                  ))}
          </List>
                </div>
              </Drawer>
            </Hidden>
      </nav>
  )
}


{/* <span class="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock">Inbox</span> */}
