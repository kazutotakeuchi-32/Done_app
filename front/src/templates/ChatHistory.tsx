import React, { useEffect, useState } from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { API_ROOT } from '../constants'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: '36ch',
    },
    inline: {
      display: 'inline',
    },
  })
)

type Props = {
  onClick: (e: any) => void
}

export default function AlignItemsList({ onClick }: Props) {
  const classes = useStyles()
  const userSelector = (state) => state.users
  const { id } = useSelector(userSelector)
  const [rooms, setRooms] = useState<any>([])
  useEffect(() => {
    const fetchChathistory = async () => {
      const res = await axios.get(`${API_ROOT}/api/v1/users/${id}/rooms`)
      setRooms(res.data.data.rooms)
    }
    fetchChathistory()
  }, [])

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

  return (
    <List className={classes.root}>
      {rooms.length != [] &&
        rooms.map((room) => (
          <>
            <ListItem
              alignItems="flex-start"
              onClick={() => {
                onClick(room)
              }}
            >
              <ListItemAvatar>
                <Avatar src={room.user.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  room.user.name + '  ' + DateFormat(new Date(room.lastMessages.created_at), 'YYYY/MM/DD/ HH:MM')
                }
                secondary={
                  <React.Fragment>
                    <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">
                      <p style={{ margin: '0', textAlign: 'end' }}></p>
                    </Typography>
                    {room.lastMessages.user_id == id
                      ? `あなた：${room.lastMessages.message}`
                      : room.lastMessages.message}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        ))}
    </List>
  )
}
export const ChatHistroy = ({ onClick }: Props) => {
  return (
    <>
      <header
        style={{
          width: '100%',
          height: '30px',
          display: 'flex',
          justifyContent: 'center',
          background: '#273246',
          color: 'white',
        }}
      >
        <p style={{ margin: '0', marginTop: '2px', textAlign: 'center' }}>チャット履歴</p>
      </header>
      <div className="" style={{ height: '400px', display: 'flex', justifyContent: 'center', background: '#eee' }}>
        <AlignItemsList onClick={onClick} />
      </div>
    </>
  )
}
