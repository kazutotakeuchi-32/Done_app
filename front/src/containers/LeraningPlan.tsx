import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector} from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import * as yup from 'yup'
import { fetchPostDraftLearning } from '../reducks/draft_learns/operations'
import { TaskListForm } from '../templates/TaskListForm'
import { ModalForm } from '../templates/modalForm'
import { PreviewButton } from '../templates/PreviewButton'
import { LinearProgress } from '@material-ui/core'
import { getUser } from "../reducks/users/operations";

const SignupSchema = yup.object().shape({
  title: yup.string().required('This field is required.'),
  content: yup.string().email().required('This field is required.'),
  time: yup
    .string()
    .min(6, 'Password is too short.')
    .max(20, 'Password is too long.')
    .required('This field is required.'),
})

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
}))


export const LearningPlan = () => {
  const [isLoading,setIsLoading] = useState(false)
  const classes = useStyles()
  const dispatch = useDispatch()
  const nowTime = new Date().getHours()
  const useLearns = (state) => state.learns
  const useUsers = state => state.users
  const {nextTasks} = useSelector(useLearns)
  const {id} = useSelector(useUsers)
  // 送信フォーム
  const [removeTaskId, setRemoveTaskId] = useState(0)
  const [tasks, setTasks] = useState<any>([])
  const [sendLearningPlan, setSendLearningPlan] = useState('')
  // モーダル
  const [taskId, setTaskId] = useState(0)
  const [open, setOpen] = React.useState(false)
  useEffect(()=>{
    setIsLoading(true)
    dispatch(getUser(id))
    setTimeout(()=>{
      setIsLoading(false)
    },1000)
  },[])

  const handleSubmidPreview = (vls, { resetForm }) => {
    setTaskId((vls) => {
      return vls + 1
    })
    vls.id = taskId + 1
    // tasks.push(vls)
    setTasks((ary) => [...ary, vls])
    setSendLearningPlan(
      (value) =>
        (value += `--------------------------------------\nタスク番号:${vls.id}\n学習タスク：${vls.title}\n科目名：${vls.subject}\n学習時間：${vls.time}\n学習内容:${vls.content}\n--------------------------------------\n`)
    )
    setOpen(false)
    resetForm()
  }
  const handleSubmid = () => {
    dispatch(fetchPostDraftLearning(tasks))
  }
  const handleClick = (e) => {
    const removeTask = tasks.filter((task) => task.id == removeTaskId)[0]
    if (!removeTask) {
      return
    }
    setTasks((preAry) => preAry.filter((task) => task.id != removeTaskId))
    setSendLearningPlan((preStr) =>
      preStr.replace(
        `--------------------------------------\nタスク番号:${removeTask.id}\n学習タスク：${removeTask.title}\n科目名：${removeTask.subject}\n学習時間：${removeTask.time}\n学習内容:${removeTask.content}\n--------------------------------------\n`,
        ''
      )
    )
  }
  return (
    <>
      {
        isLoading?
        <LinearProgress/>
        :
        <div className={classes.box}>
      {8 < nowTime && nowTime < 24 ? (
        nextTasks.data.length == 0?
        <>
          <Container component="main" maxWidth="md">
            <CssBaseline />
            <TaskListForm
              tasks={tasks}
              removeTaskId={removeTaskId}
              sendLearningPlan={sendLearningPlan}
              handleSubmid={handleSubmid}
              onChange={(e) => {
                setRemoveTaskId(parseInt(e.target.value))
              }}
            />
            <PreviewButton addClick={() => setOpen(true)} deleteClick={handleClick} tasksLength={tasks.length} />
          </Container>

          <ModalForm
            tasks={{
              id: 0,
              title: '',
              subject: '',
              time: 0,
              content: '',
            }}
            open={open}
            handleOpen={() => {
              setOpen(true)
            }}
            handleClose={() => {
              setOpen(false)
            }}
            handleSubmid={handleSubmidPreview}
            submidText={"追加"}
            isReadonly={false}
          />
        </>
        :
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <div className="" style={{textAlign:"center"}}>登録済みです。</div>
        </Container>
      ) : (
        <div className="">
          時間外ですので投稿を行うことができません。
        </div>
      )}
    </div>
      }
    </>

  )
}
