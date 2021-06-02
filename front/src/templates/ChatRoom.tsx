import React, { useEffect, useState } from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import '../assets/chat.css'
import { Avatar, IconButton } from '@material-ui/core'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import { Cable } from './Cable'
import axios from 'axios'
import {API_ROOT} from '../constants'

function DateFormat(date, format: string): string {
  if (date == 'Invalid Date') {
    return ''
  }
  const nowDate = new Date()
  const year = nowDate.getFullYear()
  const month = nowDate.getMonth() + 1
  const d = nowDate.getDate()
  if (year == date.getFullYear() && month == date.getMonth() + 1 && d == date.getDate()) {
    format = format.replace(/YYYY\//, '')
    format = format.replace(/MM\//, '')
    format = format.replace(/DD\//, '')
  } else {
    format = format.replace(/YYYY/, date.getFullYear())
    format = format.replace(/MM/, (date.getMonth() + 1).toString().padStart(2, '0'))
    format = format.replace(/DD/, date.getDate().toString().padStart(2, '0'))
  }
  format = format.replace(/HH/, date.getHours().toString().padStart(2, '0'))
  format = format.replace(/MM/, date.getMinutes().toString().padStart(2, '0'))
  return format
}

type AtherUserMessageProps = {
  user: {
    id: number
    name: string
    email: string
    avatar: string
  }
  message: {
    id: number
    user_id: number
    room_id: number
    message: string
    created_at: Date
    updated_at: Date
  }
  read: {
    id: number
    user_id: number
    message_id: number
    already_read: boolean
    created_at: Date
    updated_at: Date
  }
}

export const AtherUserMessage = ({ user, message }: AtherUserMessageProps) => {
  return (
    <div className="line__left">
      <figure>
        <Avatar src={user.avatar} style={{ padding: '5px' }} />
      </figure>
      <div className="line__left-text">
        <div className="name">
          <br />
          {user.name}
        </div>
        <div className="text">{message.message}</div>
        {<span className="date">{DateFormat(new Date(message.created_at), 'YYYY/MM/DD/ HH:MM')}</span>}
      </div>
    </div>
  )
}

type MyMessageProps = {
  message: {
    id: number
    user_id: number
    room_id: number
    message: string
    created_at: Date
    updated_at: Date
  }
  read: {
    id: number
    user_id: number
    message_id: number
    already_read: boolean
    created_at: Date
    updated_at: Date
  }
}

export const MyMessage = ({ message, read }: MyMessageProps) => {
  return (
    <>
      <div className="line__right">
        <div className="text">{message.message}</div>

        {read.already_read ? (
          <span className="date">
            既読
            <br />
            {DateFormat(new Date(read.updated_at), 'YYYY/MM/DD/ HH:MM')}
          </span>
        ) : (
          <span className="date">
            <br />
            {DateFormat(new Date(message.created_at), 'YYYY/MM/DD/ HH:MM')}
          </span>
        )}
      </div>
      <div style={{ clear: 'both' }}></div>
    </>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
      margin: 'auto',
      paddingBottom: '0',
    },
    inline: {
      display: 'inline',
    },
    img: {
      height: '30px',
    },
    avatar: {
      height: '30px',
      width: '30px',
    },
  })
)

type Props = {
  myId: number
  user: {
    id: number
    name: string
    email: string
    avatar: string
  }
  room: {
    id: number
    created_at: Date
    updated_at: Date
  }
  messages: [
    {
      id: number
      user_id: number
      room_id: number
      message: string
      created_at: Date
      updated_at: Date
    }
  ]
  reads: [
    {
      id: number
      user_id: number
      message_id: number
      already_read: boolean
      created_at: Date
      updated_at: Date
    }
  ]
  onClick: () => void
  // onReceived: (e: any) => void
  setMessageCallback: (e: any) => void
  setReadCallback: (e: any) => void
  onSubmit: (e: any, room: { id: number; created_at: Date; updated_at: Date }) => void
}

export const ChatRoom = ({
  onClick,
  user,
  room,
  onSubmit,
  messages,
  myId,
  reads,
  setMessageCallback,
  setReadCallback,
}: Props) => {
  const classes = useStyles()
  const ref = React.createRef<HTMLDivElement>()
  const [isClick, setIsClick] = useState(false)
  useEffect(() => {
    if (isClick) {
      scrollToBottomOfList()
      setIsClick(false)
    } else {
      ref.current?.scrollIntoView()
    }
  }, [messages])

  const scrollToBottomOfList = React.useCallback(() => {
    if (ref) {
      ref!.current!.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }, [ref])

  return (
    <>
      <header
        style={{
          width: '100%',
          height: '30px',
          display: 'flex',
          background: '#273246',
          color: 'white',
        }}
      >
        <IconButton style={{ color: 'white' }} onClick={onClick}>
          <KeyboardBackspaceIcon />
        </IconButton>
        <p style={{ margin: '0', marginTop: '2px', textAlign: 'center' }}>{user.name}</p>
      </header>
      <div
        className="line__container"
        style={{ height: '450px', overflow: 'scroll', fontSize: '12px', padding: '0 10px' }}
      >
        {messages.map((message, i) => (
          <div className="" key={i}>
            {console.log(reads.length, messages.length, i)}
            {/* {console.log(message.user_id,myId,reads[i],i,messages.length,reads.length) */}
            {message.user_id != myId ? (
              <AtherUserMessage user={user} message={message} read={reads[i]} />
            ) : (
              <MyMessage message={message} read={reads[i]} />
            )}
            <div ref={ref} id={'scroll'} />
          </div>
        ))}
      </div>
      <Cable
        room={room}
        onReceived={async (res) => {
          if (myId != res.message.user_id && res.name == '未読') {
            const res2 = await axios.put(
              `${API_ROOT}/api/v1/users/${res.message.user_id}/rooms/${res.message.room_id}/reads/${res.read.id}`,
              {
                room: {
                  already_read: true,
                },
              }
            )
          }
          if (myId == res.message.user_id && res.name == '既読') {
            reads[reads.length - 1].already_read = true
            res.reads = reads
            setReadCallback(res)
            return
          }
          if (myId != res.message.user_id && res.name == '既読') {
            return
          }
          if (myId == res.message.user_id && res.name == '既読') {
            reads[reads.length - 1].already_read = true
            res.reads = reads
            setReadCallback(res)
            return
          }
          if (res.name == '入室') {
            setReadCallback(res)
            return
          }
          setReadCallback(res)
          reads.push(res.read)
          setMessageCallback(res)
          messages.push(res.message)

        }}
      />
      <div
        className=""
        style={{
          height: '30px',
          display: 'flex',
          justifyContent: 'space-around',
          margin: '0',
          color: 'white',
          background: '#7494c0',
          backgroundColor: '#eee',
        }}
      >
        <form
          style={{ display: 'flex' }}
          onSubmit={async (e) => {
            e.preventDefault()
            onSubmit(e, room)
            scrollToBottomOfList()
            setIsClick(true)
          }}
        >
          <div className="">
            <textarea style={{ height: '100%' }} name="" id="" cols={30} rows={1}></textarea>
          </div>
          <div className="">
            <input
              type="submit"
              value="送信"
              style={{ background: 'grey', color: 'white', backgroundColor: 'royalblue' }}
            />
          </div>
        </form>
      </div>
    </>
  )
}
