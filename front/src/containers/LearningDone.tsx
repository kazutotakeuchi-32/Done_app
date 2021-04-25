import { Button, Container, CssBaseline, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGetDraftNextTasks} from '../reducks/draft_learns/operations'
import { fetchGetLearnNextTasks } from '../reducks/learns/operations'

import { fetchPostLearning } from '../reducks/learns/operations'
import { ModalForm } from '../templates/modalForm'
import { DenseTable } from '../templates/Table'

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  box: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  boild: {
    fontWeight: 800,
    margin: '10px',
  },
}))

export const LearningDone = () => {
  const nowTime = new Date().getHours()
  const dispatch = useDispatch()
  const useDraftLearns = (state) => state.draftLearns
  const useLearns = (state) => state.learns
  const [open, setOpen] = React.useState(false)
  const { nextTasks } = useSelector(useDraftLearns)
  const {nextTasks:learnNextTask} = useSelector(useLearns)
  const cheacks: any = []
  for (let i = 0; i < nextTasks.data.length; i++) {
    cheacks.push({ id: nextTasks.data[i].id, checked: false })
  }
  const [isCheacks, setIsCheacks] = useState(cheacks)
  const [title, setTitle] = useState('')
  const [id, setId] = useState(0)
  const [subject, setSubject] = useState('')
  const [time, setTime] = useState(0)
  const [content, setContent] = useState('')
  const classes = useStyles()


  useEffect(() => {
    dispatch(fetchGetDraftNextTasks())
    dispatch(fetchGetLearnNextTasks())
  }, [])

  const onSubmit = () => {
    dispatch(fetchPostLearning(nextTasks.data))
  }

  return (
    <div className={classes.box}>
      {17 < nowTime && nowTime < 23 ? (
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5" className={classes.boild}>
              学習タスクリスト(振り返り)
            </Typography>
            <Typography component="p" className={classes.boild}>
              今日の学習の振り返りを行いましょう。
            </Typography>
            {nextTasks.data.length != 0 ? (
              learnNextTask.data.length ==0 ?

              <DenseTable
                draftNextTasks={nextTasks}
                handleClick={(e) => {
                  const setTask = nextTasks.data.filter((n) => n.id == e.target.id)[0]
                  setId(setTask.id)
                  setTitle(setTask.title)
                  setSubject(setTask.subject)
                  setTime(setTask.time)
                  setContent(setTask.content)
                  setOpen(true)
                }}
                handleCheaked={(e, row) => {
                  setIsCheacks((state) => {
                    return state.map((s) => {
                      if (row.id == s.id) {
                        return { id: s.id, checked: e.target.checked }
                      }
                      return s
                    })
                  })
                }}
              />
              :
              <div className="">
                登録済みです。
              </div>
            ) : (
              <div className="">タスクが登録されていません。</div>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={onSubmit}
              className={classes.submit}
              disabled={isCheacks.map((c) => c.checked).every((e) => e) ? false : true}
            >
              送信
            </Button>
          </div>
          <ModalForm
            open={open}
            tasks={{ id: id, title: title, subject: subject, time: time, content: content }}
            handleOpen={() => {
              setOpen(true)
            }}
            handleClose={() => {
              setOpen(false)
            }}
            handleSubmid={(vl) => {
              nextTasks.data = nextTasks.data.map((task) => {
                if (task.id == vl.id) {
                  task.title = vl.title
                  task.subject = vl.subject
                  task.content = vl.content
                  task.time = vl.time
                  return task
                }
                return task
              })
              setOpen(false)
            }}
          />
        </Container>
      ) : (
        <div className="">時間外なので投稿ができません</div>
      )}
    </div>
  )
}
