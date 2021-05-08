import React, { useEffect } from "react"
import { useDispatch,useSelector  } from "react-redux";
import {  makeStyles, Typography ,Theme } from '@material-ui/core'
import { push } from 'connected-react-router'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Graph } from "./Graph";
import { TodaysTasks} from "./TodaysTasks"
import { TimeLine } from "./TimeLine";
import { DirectMessage } from "./DirectMessage";
import { PastTasks } from "./PastTasks";
import { UserSearch } from "./UserSearch";

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
}));

 export const ScrollableTabsButtonForce= ()=> {
  const classes = Styles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue: number) => {
    setValue(newValue);
  };
  function a11yProps(index: any) {
    return {
      id: `scrollable-force-tab-${index}`,
      'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
  }
  const isDisable:boolean = localStorage.getItem("anotherUser")? true : false

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="分析"  {...a11yProps(0)} />
          <Tab label="今日のタスク"  {...a11yProps(1)} />
          <Tab label="タイムライン" {...a11yProps(2)} />
          <Tab label="DM" {...a11yProps(3)} disabled={isDisable} />
          <Tab label="過去のタスク"  {...a11yProps(4)} />
          <Tab label="ユーザ検索" {...a11yProps(5)}  disabled={isDisable}/>
        </Tabs>
      </AppBar>
      <Graph value={value} index={0}/>
      <TodaysTasks value={value} index={1}/>
      <TimeLine value={value} index={2} />
      <DirectMessage value={value} index={3}/>
      <PastTasks value={value} index={4}/>
      <UserSearch value={value} index={5}/>
    </div>
  );
}
