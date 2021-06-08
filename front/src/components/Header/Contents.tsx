import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Logo from '../../assets/images/done.png'
import Avatar from '@material-ui/core/Avatar'
import AccountCircle from '@material-ui/icons/AccountCircle'
import NotificationsIcon from '@material-ui/icons/Notifications'
import SvgIcon from '@material-ui/core/SvgIcon'
import { Menu, MenuItem } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import Badge from '@material-ui/core/Badge'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Checkbox from '@material-ui/core/Checkbox'
import DeleteIcon from '@material-ui/icons/Delete'
import { Divider } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // flexGrow: 1,
      justifyContent: 'space-between',
      minHeight: '0',
      [theme.breakpoints.down('xs')]: {
        display: 'flex',
        position: 'relative',
      },
    },
    header: {
      padding: '0 10%',
      backgroundColor: 'white',
      display: 'flex',
      [theme.breakpoints.down('xs')]: {
        padding: '0 ',
      },
      // justifyContent:"center"
    },
    imgBox: {
      [theme.breakpoints.down('xs')]: {
        margin: 'auto',
      },
    },
    img: {
      // marginTop:"10px",
      // marginLeft:"50px",
      // height:"40px"
      height: '35px',
      marginTop: '3px',
    },
    button: {
      // marginTop:"10px",
      display: 'block',
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    buttonBox: {
      display: 'flex',
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      backgroundColor: '#333',
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    none: {
      display: 'none',
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
  isLogin: boolean
  open: boolean
  id: number
  avatar: string
  anchorEl: any
  anchorNotification: any
  openNotification: any
  checked: any
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
  handleClick: () => void
  handleMenu: (e: any) => void
  handleClose: (e) => void
  handleNotification: (e: any) => void
  handleNotificationClose: (checked: any, notifications: any) => any
  handleToggle: (value: any) => () => void
}

export const Contents = ({
  isLogin,
  id,
  open,
  avatar,
  anchorEl,
  anchorNotification,
  openNotification,
  checked,
  notifications,
  handleNotification,
  handleClick,
  handleClose,
  handleMenu,
  handleNotificationClose,
  handleToggle,
}: Props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const notificationLength = notifications.length
  const pushToClose = (call, herf) => {
    call()
    dispatch(push(herf))
  }

  function notificationText(notification): string {
    let text = ''
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
    <>
      <div className={classes.imgBox}>
        <img src={Logo} alt="done" className={classes.img} />
      </div>
      {isLogin ? (
        <div className={classes.buttonBox}>
          <IconButton onClick={() => pushToClose(handleClose, `/`)}>
            <SvgIcon color="action">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </SvgIcon>
          </IconButton>
          <IconButton onClick={handleNotification} id={'notification'}>
            <Badge
              color={'primary'}
              badgeContent={notificationLength}
              invisible={notificationLength >= 1 ? false : true}
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
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
          <IconButton onClick={handleMenu} id={'setting'}>
            {avatar != '' ? <Avatar className={classes.small} alt="Remy Sharp" src={avatar} /> : <AccountCircle />}
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={() => pushToClose(handleClose, `/users/${id}`)}>マイページ</MenuItem>
            <MenuItem onClick={() => pushToClose(handleClose, `/users/setting`)}>アカウント設定</MenuItem>
            <MenuItem onClick={handleClick}>ログアウト</MenuItem>
          </Menu>
        </div>
      ) : (
        <div className={classes.buttonBox}>
          <Button className={classes.button} href="/signup">
            signup
          </Button>
          <Button className={classes.button} href="/login">
            Login
          </Button>
        </div>
      )}
    </>
  )
}
