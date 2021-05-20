import axios from 'axios'
import React, { useEffect, useRef } from 'react'
import  LogIcon from "../assets/images/Done (4).png";
import  Logo from "../assets/images/done.png";
import FavoriteIcon from '@material-ui/icons/Favorite'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // width: '50%',
      boxShadow: "0px 3px 6px #0000001A",
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
      margin:"auto",
      paddingBottom:"0"
    },
    inline: {
      display: 'inline',
    },
    img:{
      height: "30px",
      // width:"30px"
      // marginLeft:"px",
    },
    avatar:{
      height: "30px",
      width:"30px"
      // marginLeft:"px",
    }
  })
)

type Props = {
  timeLine: [
    {
      user: {
        id: number
        name: string
        avatar: string
      }
      data:string
    },
  ],
  onClick:(e:any)=>void,
  scrollTopRef: React.MutableRefObject<any>,
  isActive:boolean
}
function TimeLineFormat(str:string) {
  const [date,...newStrs]=str.split("\n")
  return(
    <>
      <p style={{textAlign:"right",margin:"auto",}}>{date}</p>
      {newStrs.map((s)=>(
        <>
          {s}
          <br/>
        </>
      ))}
    </>
  )


}

export default function TimeLineItems({ timeLine,scrollTopRef,isActive,onClick}: Props) {
  const classes = useStyles()
  return (
    <>
    <List className={classes.root}>
    <header style={{width:"100%",height:"30px",boxShadow: "0px 3px 6px #0000001A",display:"flex",justifyContent:"space-around",borderRadius:"5px"}}>
      <img src={Logo} alt="" className={classes.img}/>
    </header>
    <div className=""></div>
      <div className="" style={{height:"450px",overflow:"scroll"}}>
      <div ref={scrollTopRef}/>
      {timeLine.map((t) => {
        return (
          <>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                {/* アバター画像 */}
                {t.user.avatar == '' ? (
                  <Avatar />
                ) : (
                  <Avatar alt={`${t.user.name}さんのプロフィール画像`} src={t.user.avatar}  className={classes.avatar}/>
                )}
                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
              </ListItemAvatar>
              <ListItemText
                // 名前
                primary={t.user.name}
                secondary={
                  <React.Fragment>
                    {/* 内容 */}
                    {/* <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">
                    </Typography> */}
                    {TimeLineFormat(t.data)}

                    {/* {" — I'll be in your neighborhood doing errands this…"} */}

                    <div className="" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <FavoriteIcon fontSize="small" style={{ color: 'red' }} /> 10
                    </div>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </>

        )
      })}
      {
        isActive &&
           <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={`Doneさんのプロフィール画像`} src={LogIcon}  className={classes.avatar}/>
        </ListItemAvatar>
          <ListItemText
                // 名前
                primary={ "学習管理アプリ「Done」運営"}
                secondary={
                  <React.Fragment>
                    {/* 内容 */}
                    {/* <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">
                    </Typography> */}
                     {/* <p style={{textAlign:"right",margin:"auto",}}></p> */}
                    {/* {" — I'll be in your neighborhood doing errands this…"} */}
                     学習管理アプリ「Done」の世界へようこそ‼️
                     <br/>
                     タイムラインでは、フォロしたーアカウントの学習状況をリアルタイムで確認ができます。
                     気になるアカウントをフォローして、仲間の学習状況を確認しよう。
                    <div className="" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <FavoriteIcon fontSize="small" style={{ color: 'red' }} /> 10
                    </div>
                  </React.Fragment>
                }
              />
         </ListItem>
      }

      </div>
      <footer style={{height: "30px",background:"royalblue",display:"flex",justifyContent:"space-around",margin:"0",color:"white",borderRadius:"5px"}}>
        <Button style={{margin:"5px"}} color={"inherit"} onClick={onClick}>タイムライン</Button>
        <Button style={{margin:"5px"}} color={"inherit"} onClick={onClick}>投稿</Button>
        <Button style={{margin:"5px"}} color={"inherit"} onClick={onClick}>いいね</Button>
      </footer>
    </List>
    </>
  )
}

// {
//   timeLine.map((data)=>{
//   const user = getUser(users,data.user_id)
//    return (
//     <>
//   <ListItem alignItems="flex-start">
//   <ListItemAvatar>
//     {/* アバター画像 */}
//     {user.avatar == '' ? <Avatar /> : <Avatar alt={`${user.name}さんのプロフィール画像`} src={user.avatar} />}
//     {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
//   </ListItemAvatar>
//   <ListItemText
//    // 名前
//     primary={user.name}
//     secondary={
//       <React.Fragment>
//         {/* 内容 */}
//         <Typography
//           component="span"
//           variant="body2"
//           className={classes.inline}
//           color="textPrimary"
//         >
//          タスク {data.title}
//         </Typography>
//         <p>{data.content}</p>
//         {/* {" — I'll be in your neighborhood doing errands this…"} */}

//         <div className="" style={{display:"flex",justifyContent:"flex-end"}}>
//           <FavoriteIcon fontSize="small" style={{color:"red"}}/> 10
//           </div>
//       </React.Fragment>
//     }
//   />
// </ListItem>
// <Divider variant="inset" component="li" />
//   </>)
//   })
// }

// <List className={classes.root}>
// <ListItem alignItems="flex-start">
//   <ListItemAvatar>
//     {/* アバター画像 */}
//     <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
//   </ListItemAvatar>
//   <ListItemText
//    // 名前
//     primary="Brunch this weekend?"
//     secondary={
//       <React.Fragment>
//         {/* 内容 */}
//         <Typography
//           component="span"
//           variant="body2"
//           className={classes.inline}
//           color="textPrimary"
//         >
//           Ali Connors
//         </Typography>
//         {" — I'll be in your neighborhood doing errands this…"}

//         <div className="" style={{display:"flex",justifyContent:"flex-end"}}>
//           <FavoriteIcon fontSize="small" style={{color:"red"}}/> 10
//           </div>
//       </React.Fragment>
//     }
//   />
// </ListItem>
// <Divider variant="inset" component="li" />
//     </List>
