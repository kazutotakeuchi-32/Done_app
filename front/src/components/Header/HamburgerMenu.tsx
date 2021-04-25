import React from "react"
import { createStyles,IconButton, makeStyles ,Theme } from "@material-ui/core"
import MenuIcon from '@material-ui/icons/Menu';

type Props = {
  toggleDrawer:(open:boolean)=>void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  }),
);
export const HamburgerMenu = (props:Props)=>{
  const  {toggleDrawer} = props
  const classes =  useStyles()
  return (
    <IconButton
    edge="start"
    className={classes.menuButton}
    color="inherit"
    aria-label="menu"
    onClick={()=>toggleDrawer(true)}
    >
      <MenuIcon />
    </IconButton>
  )
}
