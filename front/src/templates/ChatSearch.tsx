import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import axios from 'axios'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    root: {
      width: '100%',
      maxWidth: 360,
      margin: 'auto',
    },
    body: {
      paddingTop: '10px',
    },
  })
)

type Props = {
  onClick: (e: any) => void
}

export const ChatSearch = ({ onClick }: Props) => {
  const classes = useStyles()
  const userSelector = (state) => state.users
  const { id } = useSelector(userSelector)
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('')
  const [users, setUsers] = useState<any>([])
  const onChange = (e) => {
    setSearch(e.target.value)
  }
  useEffect(() => {
    const fetchMutalFollowing = async () => {
      const res = await axios.get(`http://localhost:3000/api/v1/users/${id}/mutual_following`)
      setUsers(res.data.data.users)
    }
    fetchMutalFollowing()
  }, [])

  useEffect(() => {
    const userSearch = async () => {
      const res = await axios(`http://localhost:3000/api/v1/users/${id}/mutual_following?search=${search}`)
      setUsers(res.data.data.users)
      setMessage(res.data.data.message)
    }
    userSearch()
  }, [search])
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
        <p style={{ margin: '0', marginTop: '2px', textAlign: 'center' }}>ユーザ検索</p>
      </header>
      <div className="" style={{ height: '400px', display: 'flex', justifyContent: 'center', background: '#eee' }}>
        <div className="">
          <div className={classes.search} style={{ margin: 'auto', marginTop: '30px' }}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              onChange={onChange}
              value={search}
              placeholder="ユーザ名を入力"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              style={{ border: '1px solid', borderRadius: '30px' }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          {users.length > 0 && (
            <div className={classes.body}>
              <List dense className={classes.root}>
                {users.map((user, index) => {
                  const labelId = `checkbox-list-secondary-label-${index}`
                  return (
                    <>
                      <ListItem key={index} onClick={() => onClick(user)} button>
                        <ListItemAvatar>
                          {user.avatar == '' ? (
                            <Avatar />
                          ) : (
                            <Avatar alt={`${user.name}さんのプロフィール画像`} src={user.avatar} />
                          )}
                        </ListItemAvatar>
                        <ListItemText id={labelId} primary={`${user.name}`} />
                      </ListItem>
                      <Divider />
                    </>
                  )
                })}
              </List>
            </div>
          )}
          {search.length > 0 && users.length == 0 && (
            <div className="" style={{ paddingTop: '10px', textAlign: 'center' }}>
              {message}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
