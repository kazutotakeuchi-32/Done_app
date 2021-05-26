import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useSelector } from 'react-redux'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import { API_ROOT } from '../constants'

type Props = {
  item: any
  data:string
  otherUser:any
}
export const Like = ({item,data,otherUser}: Props) => {
  const userSelector = (state) => state.users
  const { id, uid, client, token } = useSelector(userSelector)
  const [likes, setLikes] = useState(item)
  const [likeCount, setLikeCount] = useState(item.length)
  useEffect(() => {
    setLikes(item)
    setLikeCount(item.length)
  }, [item])

  return (
    <div className="" style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <IconButton
        style={{ padding: '0' }}
        onClick={async (e) => {
          const option = {
            headers: {
              client: client,
              'access-token': token,
              uid: uid,
            },
          }
          const date = data.match(/[0-9]{4}\/[0-9]{1,2}\/[0-9]{1,2}/)
          const likeType = data.match(/学習の振り返り/) ?  'LEARN':'DRAFTLEARN'
          if (likes.filter((like) => like.user_id == id).length != []) {
            const res = await axios.delete(
              `${API_ROOT}/api/v1/likes?type=${likeType}&date=${date}&other_user=${otherUser}`,
              option
            )
            if (res.status == 200) {
              setLikeCount((state) => state - 1)
              const nextLikes = likes.filter((like) => like.user_id != id)
              setLikes(nextLikes)
            }
          } else {
            const res = await axios.post(
              `${API_ROOT}/api/v1/likes`,{
                type:likeType,
                date:`${date}`,
                other_user:otherUser
              },
              option
            )
            if (res.status == 200) {
              setLikeCount((state) => state + 1)
              setLikes([...likes,{user_id:id}])
              // state.push({ user_id: id })
              // return state
              console.log(likes);
            }
          }
        }}
      >
        {console.log(likes)}
        {likes.filter((like) => like.user_id == id).length != [] ? (
          <FavoriteIcon fontSize="small" style={{ color: 'red' }} />
        ) : (
          <FavoriteBorderIcon fontSize="small" />
        )}
      </IconButton>
      {likeCount}
    </div>
  )
}
