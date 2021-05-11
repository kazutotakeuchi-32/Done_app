import React, { useEffect } from "react"
import {  makeStyles, Typography ,Theme } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { Follows } from "./Follows";
import { Followers } from "./Follower";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

export function FollowTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
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

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const Styles = makeStyles((theme: Theme) => ({
  root: {
    width: "auto",
    boxShadow: '0px 3px 6px #0000001A'
  },
}));

export default function Followtabs() {
  const classes = Styles();
  const id=location.href.split("/")[4]
  const index:number = location.href.split("/")[5] =="follows"? 0 : 1
  const [value, setValue] = React.useState(index);
  const handleChange = (event: React.ChangeEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <div  className={classes.root}
    >
      <AppBar position="static" color="default" >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="フォロー" {...a11yProps(0)} />
          <Tab label="フォロワー" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
        <Follows value={value} index={0} userId={id}/>
        <Followers value={value} index={1} userId={id}/>
    </div>
  );
}
