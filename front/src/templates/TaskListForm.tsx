import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { Formik, Form } from 'formik'
import {  MenuItem } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(7),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0px 3px 6px #0000001A',
    padding: '30px 50px',
    [theme.breakpoints.down('xs')]: {
      border: 'none',
      padding: '30px 30px',
      marginTop: theme.spacing(6),
    },
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  boild: {
    fontWeight: 800,
  },
  denceTable:{
    padding:"20px"
  }
}))

type Props = {
  tasks: [
    {
      id: number
      title: string
      content: string
      time: number
    }
  ]
  removeTaskId: number
  sendLearningPlan: string
  handleSubmid: (values: any) => void
  onChange: (e: any) => void
}


export const TaskListForm = (props: Props) => {
  const classes = useStyles()
  const { tasks, handleSubmid, onChange, removeTaskId, sendLearningPlan } = props
  return (

    <div className={classes.paper}>
      <Typography component="h1" variant="h5" className={classes.boild}>
        学習タスクリスト(計画)
      </Typography>
      <Grid container>
        <Grid item xs={6}></Grid>
      </Grid>
      {tasks.length >= 1 && (
        <Grid item xs={12}>
          <TextField
            id="filled-select-currency"
            select
            label="Select"
            value={removeTaskId}
            onChange={onChange}
            helperText="取り消したいタスクを入力をして下さい"
            variant="filled"
          >
            {tasks.map((task, index) => (
              <MenuItem key={index} value={task.id}>
                タスク番号{task.id}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      )}
      <Grid container>
        <Grid item xs={6}></Grid>
      </Grid>
      <Formik
        initialValues={{
          content: sendLearningPlan,
        }}
        onSubmit={handleSubmid}
      >
        {({ errors, handleChange, values, touched }) => (
          <Form className={classes.form}>
            <Grid container spacing={2} justify="center">
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={15}
                  value={sendLearningPlan}
                  placeholder="学習内容を具体的に記載してください。"
                  onChange={handleChange}
                  id="content"
                  label="Content"
                  name="content"
                  autoComplete="content"
                  disabled={true}
                  // helperText={
                  //   errors.email && touched.email ? errors.email : null
                  // }
                />
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              送信
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
