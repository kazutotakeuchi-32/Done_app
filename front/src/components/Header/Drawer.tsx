import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Badge, Link } from '@material-ui/core'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import { Menu } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { ListItemAvatar } from '@material-ui/core'
import { Avatar } from '@material-ui/core'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Checkbox from '@material-ui/core/Checkbox'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      // marginTop:"10px",
      display: 'block',
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    list: {
      width: 250,
    },
  })
)
type user = {
  id: number
  admin: boolean
  allow_password_change: boolean
  avatar: string
  email: string
  name: string
  provider: string
  uid: string
  created_at: Date
  updated_at: Date
}

type Props = {
  id: any
  isOpen: boolean
  isLogin: boolean
  anchorNotification: any
  openNotification: any
  notifications: [
    {
      id: number
      kind: string
      message: {
        id: number
        message: string
        room_id: number
        user_id: number
        created_at: Date
        updated_at: Date
      }
      receiver: user
      sender: user
    }
  ]
  checked: any
  handleNotification: (e: any) => void
  handleNotificationClose: (checked: any, notifications: any) => any
  handleToggle: (value: any) => () => void
  toggleDrawer: (open: boolean) => void
  handleClick: () => void
}

export const Drawer = ({
  id,
  isOpen,
  isLogin,
  anchorNotification,
  openNotification,
  notifications,
  checked,
  handleNotification,
  handleNotificationClose,
  handleToggle,
  toggleDrawer,
  handleClick
}: Props) => {
  const dispatch = useDispatch()
  const notificationLength = notifications.length
  const classes = useStyles()
  const pushToClose = (call,herf)=>{
    call(false)
    dispatch(push(herf))
  }

  function notificationText(notification): string {
    let text = ''
    const senderName = notification.sender.name
    switch (notification.kind) {
      case 'DM':
        text = `からあなたにメッセージが届いています。`
        break
      case 'フォロー':
        text = `があなたをフォローしました。`
        break
      case 'いいね':
        text = `があなたの投稿にいいねを送りました。`
        break
    }
    return text
  }

  return (
    <SwipeableDrawer open={isOpen} onClose={() => toggleDrawer(false)} onOpen={() => toggleDrawer(true)}>
      <List className={classes.list}>
        {isLogin ? (
          <>
            <ListItem button onClick={() =>pushToClose(toggleDrawer,'/')}>
              <ListItemText primary={'ホーム'} />
            </ListItem>
            <ListItem button onClick={handleNotification}>

               <ListItemText primary={'通知'} />
               <Badge
                color={'primary'}
                badgeContent={notificationLength}
                invisible={notificationLength >= 1 ? false : true}
              />

            </ListItem>
            <ListItem button onClick={() => pushToClose(toggleDrawer,`/users/${id}`)}>
              <ListItemText primary={'マイページ'} />
            </ListItem>
            <ListItem button onClick={() => pushToClose(toggleDrawer,`/leraning/plan`)}>
              <ListItemText primary={'計画を立てる'} />
            </ListItem>
            <ListItem button onClick={() => pushToClose(toggleDrawer,`/leraning/done`)}>
              <ListItemText primary={'振り返り'} />
            </ListItem>
            <ListItem button onClick={() => pushToClose(toggleDrawer,`/users/setting`)}>
              <ListItemText primary={'アカウント設定'} />
            </ListItem>
            <ListItem button onClick={(e) => e}>
              <ListItemText primary={'お問い合わせ'} />
            </ListItem>
            <ListItem button onClick={() => handleClick()}>
              <ListItemText primary={'ログアウト '} />
            </ListItem>
          </>
        ) : (
          [
            { value: 'Signup', url: '/signup' },
            { value: 'Login', url: '/login' },
          ].map((contents, index) => (
            <ListItem button key={index}>
              <Link href={contents.url}>
                <ListItemText primary={contents.value} />
              </Link>
            </ListItem>
          ))
        )}
        <Divider />
      </List>
      {notificationLength >= 1 && (
            <Menu
              id="menu-appbar"
              anchorEl={anchorNotification}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={openNotification}
              onClose={(e) => {
                handleNotificationClose(checked, notifications)
              }}
            >
              <List style={{ maxWidth: 340, width: '100%' }}>
                <div className="" style={{ position: 'relative', paddingBottom: '30px' }}>
                  <h3 style={{ textAlign: 'center', margin: '0' }}>通知</h3>
                  <IconButton
                    style={{ padding: '5px', position: 'absolute', left: '12px', top: '12px' }}
                    onClick={() =>
                      handleNotificationClose(
                        [...Array(notificationLength)].map((_, i) => i),
                        notifications
                      )
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
                <Divider />
                {notifications.length >= 1 &&
                  notifications.map((n, i) => (
                    <>
                      <ListItem key={i} button>

                        <ListItemAvatar>
                          {n.sender.avatar == '' ? (
                            <Avatar />
                          ) : (
                            <Avatar alt={`${n.sender.name}さんのプロフィール画像`} src={n.sender.avatar} />
                          )}
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <div style={{ margin: '0' }}>
                              <p>
                                <span style={{ color: 'mediumseagreen', fontWeight: 800 }}>{n.sender.name}</span>
                                {notificationText(n)}
                                <br />
                                <span style={{ color: '#888' }}>{n.message.message}</span>
                              </p>
                            </div>
                          }
                        />
                        <ListItemSecondaryAction>
                          <Checkbox
                            edge="end"
                            onChange={handleToggle(i)}
                            checked={checked.indexOf(i) !== -1}
                            // inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider />
                    </>
                  ))}
              </List>
            </Menu>
          )}
    </SwipeableDrawer>
  )
}
