import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth:" 100px",
    minHeight:"100px"
  },
  th:{
    padding:"5px 16px"
  },
  thead:{
    // background:"#333"

    background:"#3f51b5"
  } ,
  head:{
    color:"white"
  }
});

function createData(name: string, data: number | string, ) {
  return { name, data, };
}

type Props ={
  totalPlanTime:number,
  totalDoneTime:number,
  achievementRate:number,
  maxTime:number,
  minTime:number,
  average:number,
  mode:number,
  standardDeviation:number
}

export  const AnalysisTable = (props:Props)=> {
  const {totalPlanTime,totalDoneTime,achievementRate,maxTime,minTime,average,mode,standardDeviation} = props
  const classes = useStyles();
  const rows = [
    createData('総計画時間', totalPlanTime),
    createData('総学習時間', totalDoneTime),
    createData('達成率', achievementRate),
    createData('最大学習時間', maxTime),
    createData('最小学習時間', minTime),
    createData('平均学習時間', average),
    createData('最頻値', mode),
    createData('標準偏差', standardDeviation),
  ];
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.thead} >
          <TableRow>
            <TableCell className={classes.head}>項目</TableCell>
            <TableCell className={classes.head} >データ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow  key={row.name} >
              <TableCell  component="th" scope="row" className={classes.th}>
                {row.name}
              </TableCell>
              <TableCell className={classes.th} >{row.data}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
