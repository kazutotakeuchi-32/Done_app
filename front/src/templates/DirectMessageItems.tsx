import React, { useCallback,useState } from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import '../assets/chat.css'
import { ChatRoom } from './ChatRoom'
import { ChatHistroy } from './ChatHistory'
import { ChatSearch } from './ChatSearch'
import { Button } from '@material-ui/core'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { API_ROOT } from '../constants'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
      margin: 'auto',
      paddingBottom: '0',
    },
  })
)

export const DirectMessageItems = () => {
  const classes = useStyles()
  const [tabIndex, setTabIndex] = useState(1)
  const userSelector = (state) => state.users
  const { id } = useSelector(userSelector)
  const [user, setUser] = useState<any>({})
  const [room, setRoom] = useState<any>({})
  const [messages, setmessages] = useState<any>([])

  const setMessageCallback = useCallback(
    (res) => {
      setmessages([...messages, res])
    },
    [messages]
  )

  return (
    <List className={classes.root}>
      {tabIndex == 1 && (
        <ChatSearch
          onClick={async (otherUser) => {
            const res = await axios.post(`${API_ROOT}/api/v1/entries?user_id=${id}&other_user=${otherUser.id}`)
            const room = res.data.data.room
            const res2 = await axios.get(`${API_ROOT}/api/v1/users/${id}/rooms/${room}`)
            setUser(res2.data.data.user)
            setRoom(res2.data.data.room)
            setmessages(res2.data.data.messages)
            setTabIndex(3)
          }}
        />
      )}
      {tabIndex == 2 && (
        <ChatHistroy
          onClick={async (room) => {
            const res = await axios.get(`${API_ROOT}/api/v1/users/${id}/rooms/${room.room.room_id}`)
            setTabIndex(3)
            setUser(res.data.data.user)
            setRoom(res.data.data.room)
            setmessages(res.data.data.messages)
          }}
        />
      )}
      {tabIndex == 3 && (
        <>
          <ChatRoom
            myId={id}
            user={user}
            room={room}
            messages={messages}
            onClick={() => {
              setTabIndex(1)
            }}
            onSubmit={async (e, room) => {
              const message = e.target[0].value
              e.target[0].value = ''
              const res = await axios.post(`${API_ROOT}/api/v1/users/${id}/rooms/${room.id}/messages`, {
                message: { message: message },
              })
            }}
            onReceived={setMessageCallback}
            // onReceived={(res) => {
            //   setmessages([...messages, res])
            // }}
          />
        </>
      )}

      <footer
        style={{
          height: '30px',
          background: '#273246',
          display: 'flex',
          justifyContent: 'space-around',
          margin: '0',
          color: 'white',
          border: '1px solid #ddd',
        }}
      >
        <Button style={{ margin: '5px' }} color={'inherit'} onClick={() => setTabIndex(1)}>
          ユーザ検索
        </Button>
        <Button style={{ margin: '5px' }} color={'inherit'} onClick={() => setTabIndex(2)}>
          チャット履歴
        </Button>
      </footer>
    </List>
  )
}
