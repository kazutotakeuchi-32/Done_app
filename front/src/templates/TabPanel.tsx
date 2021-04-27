import React, { useEffect } from "react"
import { useDispatch,useSelector  } from "react-redux";
import {  makeStyles, Typography ,Theme } from '@material-ui/core'
import Box from '@material-ui/core/Box';

const Styles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    padding:"20px",
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down('xs')]:{
        padding:"20px 0"
    },
  },
  TabPanel:{
    boxShadow:"0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
  }

}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

export const TabPanel=(props: TabPanelProps) =>{
  const classes = Styles()
  const { children, value, index, ...other } = props;
  return (
    <div
      className={ classes.TabPanel}
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} style={{padding:"0"}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
