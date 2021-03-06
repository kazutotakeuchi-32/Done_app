import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_ROOT } from '../constants'
import { ModalForm } from './modalForm'
import { DenseTable } from './Table'
import { TabPanel } from './TabPanel'
type Props = {
  value: number
  index: number
}
function getId():string {
  return JSON.parse(localStorage.redux).users.id == location.href.split('/')[4]
        ? JSON.parse(localStorage.redux).users.id
        : location.href.split('/')[4]
}

export const TodaysTasks = (props: Props) => {
  const { value, index } = props
  const [todaysTasks, setTodaysTasks] = useState<{ data: any; title: string }>({ data: [], title: '' })
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [id, setId] = useState(0)
  const [subject, setSubject] = useState('')
  const [time, setTime] = useState(0)
  const [content, setContent] = useState('')

  useEffect(() => {
    const getTasks = async () => {
      const id = getId()
      const res = await axios.get(`${API_ROOT}/api/v1/draft_learns/todays_task?id=${id}`)
      const { nextTasks: todayTasks } = res.data.data
      setTodaysTasks(todayTasks)
    }
    getTasks()
  }, [])

  return (
    <TabPanel index={index} value={value}>
      <div
        className=""
        style={{
          maxHeight: '400px',
          overflow: 'scroll',
        }}
      >
        {value == index && todaysTasks.data.length != 0 ? (
          <>
            <DenseTable
              draftNextTasks={todaysTasks}
              isCheckBox={false}
              handleClick={(e) => {
                const setTask = todaysTasks.data.filter((n) => n.id == e.target.id)[0]
                setId(setTask.id)
                setTitle(setTask.title)
                setSubject(setTask.subject)
                setTime(setTask.time)
                setContent(setTask.content)
                setOpen(true)
              }}
              handleCheaked={(e) => e}
            />
            <ModalForm
              open={open}
              tasks={{ id: id, title: title, subject: subject, time: time, content: content }}
              handleOpen={() => {
                setOpen(true)
              }}
              handleClose={() => {
                setOpen(false)
              }}
              handleSubmid={(vl) => vl}
              submidText={''}
              isReadonly={true}
            />
          </>
        ) : (
          <div className="">タスクが登録されていません。</div>
        )}
      </div>
    </TabPanel>
  )
}
