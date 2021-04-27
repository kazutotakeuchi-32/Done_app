import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Link } from '@material-ui/core'
import { push } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'

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

type Props = {
  id: any
  isOpen: boolean
  isLogin: boolean
  toggleDrawer: (open: boolean) => void
  handleClick: () => void
}

export const Drawer = (props: Props) => {
  const dispatch = useDispatch()
  const { id, isOpen, isLogin, toggleDrawer, handleClick } = props
  const classes = useStyles()

  const pushToClose = (call,herf)=>{
    call(false)
    dispatch(push(herf))
  }
  return (
    <SwipeableDrawer open={isOpen} onClose={() => toggleDrawer(false)} onOpen={() => toggleDrawer(true)}>
      <List className={classes.list}>
        {isLogin ? (
          <>
            <ListItem button onClick={() =>pushToClose(toggleDrawer,'/')}>
              <ListItemText primary={'ホーム'} />
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
    </SwipeableDrawer>
  )
}
