import React, { useEffect, useState } from 'react'
import { TabPanel } from './TabPanel'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import axios from 'axios'
import { UsersList } from './UsersList'
import { useSelector } from 'react-redux'

type Props = {
  value: number
  index: number
}

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
  })
)

export const UserSearch = (props: Props) => {
  const { value, index } = props
  const classes = useStyles()
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState<any>([])
  const [message, setMessage] = useState('')
  const usersSelector = (state) => state.users
  const { id } = useSelector(usersSelector)
  const onChange = (e) => {
    setSearch(e.target.value)
  }
  useEffect(() => {
    const userSearch = async () => {
      const res = await axios(`http://localhost:3000/api/v1/users/search?search=${search}&id=${id}`)
      setUsers(res.data.data.users)
      setMessage(res.data.data.message)
    }
    userSearch()
  }, [search])
  return (
    <TabPanel index={index} value={value}>
      <div className="" style={{ height: '400px', display: 'flex', justifyContent: 'center' }}>
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
          {search.length > 0 && users.length > 0 && <UsersList users={users} />}
          {search.length > 0 && users.length == 0 && (
            <div className="" style={{ paddingTop: '10px', textAlign: 'center' }}>
              {message}
            </div>
          )}
        </div>
      </div>
    </TabPanel>
  )
}
