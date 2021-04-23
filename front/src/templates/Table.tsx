import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { create } from "domain";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

type Props = {
  draftNextTasks:{
    next_tasks:[{
      id:number,
      title:string,
      subject:string,
      time:number,
      content:string,
      created_at:Date,
      updated_at:Date,
      user_id:number
    }]
  }
}

export default function DenseTable(props:Props ) {

 const draftNextTasks = props.draftNextTasks.next_tasks
  const classes = useStyles();
  function createData(name: string, calories: string, fat: number, carbs: string) {
    return { name, calories, fat, carbs };
  }
  const rows = draftNextTasks.map(task=>createData(task.title,task.subject,task.time,task.content))
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>タスク</TableCell>
            <TableCell align="right">カテゴリー</TableCell>
            <TableCell align="right">学習時間</TableCell>
            <TableCell align="right">学習内容</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
