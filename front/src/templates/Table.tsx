import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Checkbox, Typography } from "@material-ui/core";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

const useStyles = makeStyles((theme) =>({
  table: {
    minWidth: 500,
  },
  boild: {
    fontWeight: 800,
  },
  denceTable:{
    padding:"20px",
    [theme.breakpoints.down('xs')]:{
      padding:"20px 0"
    },
  },
  cell:{
    [theme.breakpoints.down('xs')]:{
      display:"none"
     },
  },
  thead:{
    [theme.breakpoints.down('xs')]:{
      display:"none"
     },
  }

}));

type Props = {
  draftNextTasks:{
    data:[{
      id:number,
      title:string,
      subject:string,
      time:number,
      content:string,
      created_at:Date,
      updated_at:Date,
      user_id:number
    }],
  },
  isCheckBox:boolean
  handleClick:(e:any)=>void,
  handleCheaked:(e:any,row:any)=>void,
}

export  const  DenseTable = (props:Props ) => {
  const draftNextTasks = props.draftNextTasks.data
  const classes = useStyles();
  function createData(id:number,name: string, calories: string, fat: number, carbs: string) {
    return { id,name, calories, fat, carbs };
  }
  const rows = draftNextTasks.map(task=>createData(task.id,task.title,task.subject,task.time,task.content))
  return (
    <TableContainer component={Paper} className={classes.denceTable}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
           { props.isCheckBox &&
            <TableCell >
              <CheckBoxOutlineBlankIcon
                style={{
                  margin:" 0 10px",
                  marginTop:"10px"
                }}
              />
            </TableCell>}
            <TableCell>タスク</TableCell>
            <TableCell  align="right">カテゴリー</TableCell>
            <TableCell align="right">学習時間(時)</TableCell>
            <TableCell  align="right">学習内容</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,i) => (
            <TableRow key={i}>
              {
                props.isCheckBox &&
                <TableCell>
                <Checkbox
                 onChange={e=>props.handleCheaked(e,row)}
                />
              </TableCell>
              }

              <TableCell component="th" scope="row" id={`${row.id}`} onClick={props.handleClick}>
                {row.name}
              </TableCell>
              <TableCell  align="right">{row.calories}</TableCell>
              <TableCell  align="right">{row.fat}</TableCell>
              <TableCell align="right">{"....."}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
