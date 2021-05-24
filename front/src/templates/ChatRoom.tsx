import React, { useEffect, useRef, useState } from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import '../assets/chat.css'
import { Avatar, IconButton } from '@material-ui/core'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'

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
}

export const MyMessage = ({ message }: MyMessageProps) => {
  return (
    <>
      <div className="line__right">
        <div className="text">{message.message}</div>
        <span className="date">
          既読
          <br />
          {DateFormat(new Date(message.created_at), 'YYYY/MM/DD/ HH:MM')}
        </span>
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
  onClick: () => void
  onSubmit: (e: any, room: { id: number; created_at: Date; updated_at: Date }) => void
}

export const ChatRoom = ({ onClick, user, room, onSubmit, messages, myId }: Props) => {
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
    ref!.current!.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
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
            {message.user_id != myId ? (
              <AtherUserMessage user={user} message={message} />
            ) : (
              <MyMessage message={message} />
            )}
            <div ref={ref} id={'scroll'} />
          </div>
        ))}
      </div>
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
