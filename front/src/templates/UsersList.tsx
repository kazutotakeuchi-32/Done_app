import React, { useEffect, useState } from 'react'
import { TabPanel } from './TabPanel'
import { useDispatch } from 'react-redux'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import { push } from 'connected-react-router'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      margin: 'auto',
      backgroundColor: theme.palette.background.paper,
    },
    body: {
      paddingTop: '10px',
    },
  })
)

type Props = {
  users: [
    {
      id: number
      name: string
      avatar: string
    }
  ]
}

export const UsersList = ({ users }: Props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  return (
    <div className={classes.body}>
      <List dense className={classes.root}>
        {users.map((user, index) => {
          const labelId = `checkbox-list-secondary-label-${index}`
          return (
            <>
              <ListItem key={index} onClick={() => dispatch(push(`/users/${user.id}`))} button>
                <ListItemAvatar>
                  {user.avatar == '' ? <Avatar /> : <Avatar alt={`${user.name}さんのプロフィール画像`} src={user.avatar} />}
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`${user.name}`} />
              </ListItem>
              <Divider />
            </>
          )
        })}
      </List>
    </div>
  )
}
