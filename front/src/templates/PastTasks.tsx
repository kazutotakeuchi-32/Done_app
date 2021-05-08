import axios from 'axios'
import React, { useEffect, useState } from 'react'
import TablePagination from '@material-ui/core/TablePagination'
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

export const PastTasks = (props: Props) => {
  const { value, index } = props
  const [previousTasks, setPreviousTasks] = useState<{ data: any; title: string }>({ data: [], title: '' })
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [id, setId] = useState(0)
  const [subject, setSubject] = useState('')
  const [time, setTime] = useState(0)
  const [content, setContent] = useState('')
  const [page, setPage] = useState(0)
  const [maxPage, setMaxPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  useEffect(() => {
    const getTasks = async () => {
      const id = getId()
      const res = await axios.get(
        `http://localhost:3000/api/v1/learns/past_tasks?id=${id}&cuurent_page=${page + 1}&rows=${rowsPerPage}`
      )
      const { previousTasks, maxPage: MP } = res.data.data
      setPreviousTasks(previousTasks)
      setMaxPage(MP)
    }
    getTasks()
  }, [])

  const handleChangePage = async (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    const id = getId()
    const res = await axios.get(
      `http://localhost:3000/api/v1/learns/past_tasks?id=${id}&cuurent_page=${newPage + 1}&rows=${rowsPerPage}`
    )
    const { previousTasks, maxPage: MP } = res.data.data
    setMaxPage(MP)
    setPreviousTasks(previousTasks)
    setPage(newPage)
  }
  const handleChangeRowsPerPage = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const id = getId()
    const res = await axios.get(
      `http://localhost:3000/api/v1/learns/past_tasks?id=${id}&cuurent_page=${1}&rows=${event.target.value}`
    )
    const { previousTasks, maxPage: MP } = res.data.data
    setMaxPage(MP)
    setPreviousTasks(previousTasks)
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <TabPanel index={index} value={value}>
      <div
        className=""
        style={{
          maxHeight: 'auto',
          overflow: 'scroll',
        }}
      >
        {value == index && previousTasks.data.length != 0 ? (
          <>
            <TablePagination
              style={{
                background: '#333',
                color: 'white',
              }}
              component="div"
              count={maxPage * rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              rowsPerPage={rowsPerPage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              rowsPerPageOptions={[10, 20, 30]}
              labelRowsPerPage="行数"
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} / ${count !== -1 ? count + '行' : `more than ${to}行`}`
              }
            />
            <div className="" style={{height:"400px",overflow:"scroll"}}>
            <DenseTable
              draftNextTasks={previousTasks}
              isCheckBox={false}
              handleClick={(e) => {
                const setTask = previousTasks.data.filter((n) => n.id == e.target.id)[0]
                setId(setTask.id)
                setTitle(setTask.title)
                setSubject(setTask.subject)
                setTime(setTask.time)
                setContent(setTask.content)
                setOpen(true)
              }}
              handleCheaked={(e) => e}
            />
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
