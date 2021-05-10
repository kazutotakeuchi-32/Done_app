import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Grid,  makeStyles, Typography } from '@material-ui/core'
import { following, unfollow } from '../reducks/users/operations'
import { IconButton, Link } from '@material-ui/core'
import { push } from 'connected-react-router'
import Avatar from '@material-ui/core/Avatar'
import { Image } from '../containers/Setting'

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },

  paper: {
    marginTop: theme.spacing(7),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0px 3px 6px #0000001A',
    padding: '30px 50px',
    [theme.breakpoints.down('xs')]: {
      border: 'none',
      padding: '30px 30px',
      marginTop: theme.spacing(6),
    },
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  boild: {
    fontWeight: 800,
  },
  denceTable: {
    padding: '20px',
  },
}))

type Props = {
  imageUrl: any
  anotherUser: any
  anotherUserString: string | null
  pushSetting: () => void
}

export const Profile = (props: Props) => {
  const { imageUrl, anotherUser, anotherUserString, pushSetting } = props
  const classes = useStyles()
  const userSelector = (state) => state.users
  const dispatch = useDispatch()
  const { name: myName, id: myId, followings: myFollowing, followers: myFollowers } = useSelector(userSelector)
  const isFollowing = (): boolean => (anotherUser.followers.some((followId) => followId == myId) ? true : false)
  const handleClick = () => {
    if (isFollowing()) {
      dispatch(unfollow(location.href.split('/')[4]))
    } else {
      dispatch(following(location.href.split('/')[4]))
    }
  }
  return (
    <Grid item sm={5} xs={12} style={{}} justify="center">
      <div
        className=""
        style={{
          width: '100%',
          height: 'auto',
          // background:"#444",
        }}
        // <>プロフィール
        // アイコン
        // 名前
        // フォロ- フォロワー リンク
        // フォロー・アンフォローボタン or アカウント設定ボタン
      >
        <div
          className=""
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {imageUrl != '' ? (
            <Image image={imageUrl} width={'200px'} height={'200px'} />
          ) : (
            <IconButton style={{ display: 'block' }}>
              <Avatar />
            </IconButton>
          )}
        </div>
        <div
          className=""
          style={{
            padding: '20px',
          }}
        >
          <Typography component="h3" variant="h5" align="center">
            {anotherUser.name ? anotherUser.name : myName}
          </Typography>
          <div
            className=""
            style={{
              display: 'flex',
              justifyContent: 'center',
              fontSize: '20px',
            }}
          >
            <a
              href=""
              style={{
                margin: '10px',
              }}
            >
              フォロー{anotherUser.followings ? anotherUser.followings.length : myFollowing.length}
            </a>
            <a
              href=""
              style={{
                margin: '10px',
              }}
            >
              フォロワー{anotherUser.followers ? anotherUser.followers.length : myFollowers.length}
            </a>
          </div>
          <div
            className=""
            style={{
              width: '50%',
              margin: 'auto',
            }}
          >
            {anotherUserString ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleClick}
                style={
                  isFollowing()
                    ? {
                        backgroundColor: 'white',
                        color: 'royalblue',
                      }
                    : {}
                }
              >
                {isFollowing() ? 'フォロー済み' : 'フォローする'}
              </Button>
            ) : (
              <Button type="submit" fullWidth variant="contained" color="primary" onClick={pushSetting}>
                設定
              </Button>
            )}
          </div>
        </div>
      </div>
    </Grid>
  )
}
