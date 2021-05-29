import React, { useEffect, useState } from "react"
import { useDispatch,useSelector  } from "react-redux";
import { Container, CssBaseline, Grid, hexToRgb, makeStyles, Typography ,Theme } from '@material-ui/core'
import { getUser } from "../reducks/users/operations";
import { push } from 'connected-react-router'
import { Profile } from "../templates/Profile";
import { ScrollableTabsButtonForce } from "../templates/ScrollableTabsButtonForce";
import { LinearProgress } from "@material-ui/core";
import { ActionCableProvider } from '@thrash-industries/react-actioncable-provider';
import { API_WS_ROOT } from "../constants";


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
      padding: '30px 0',
      boxShadow:"none",
      margin:"0"
      // marginTop: theme.spacing(6),
    }
  }
}))

export const Mypage = ()=>{
  const classes = useStyles()
  const dispatch = useDispatch()
  const userSelector  = state=>state.users
  const {id,name,avatar,client,uid,token}=useSelector(userSelector)
  const[isLoading,setIsLoading]=useState(false)
  useEffect(()=>{
    setIsLoading(true)
    if (/users\/[0-1]/.test(location.href)!=null ) {
      const id =location.href.split("/")[4]
      dispatch(getUser(id))
    }
    setTimeout(()=>{
      setIsLoading(false)
    },1000)
    localStorage.removeItem("barAggregationType")
    localStorage.removeItem("barStartDate")
    localStorage.removeItem("pieStartDate")
    localStorage.removeItem("pieAggregationType")
    return () =>{
      localStorage.removeItem("barAggregationType")
      localStorage.removeItem("barStartDate")
      localStorage.removeItem("pieStartDate")
      localStorage.removeItem("pieAggregationType")
    }
  },[location.href])

  const anotherUserString = localStorage.getItem("anotherUser")
  let anotherUser:any={}
  if (anotherUserString) {
     anotherUser = JSON.parse(anotherUserString)
  }
  const imageUrl = anotherUser.avatar == "" ||  anotherUser.avatar ? anotherUser.avatar : avatar

  return(
      <ActionCableProvider url={`${API_WS_ROOT}?token=${token}&client=${client}&uid=${uid}`}>
      {
        isLoading?
        <div style={{margin:"auto"}}>
           <LinearProgress />
        </div>

        :
        <Container  component="main" maxWidth="lg" className={classes.paper}>
        <CssBaseline />
        <h1>{anotherUser.name ?  `${anotherUser.name}の`:""}マイページ</h1>
        <Grid container>
          <Profile
            imageUrl={imageUrl}
            anotherUser={anotherUser}
            anotherUserString={anotherUserString}
            pushSetting={()=>dispatch(push("/users/setting"))}
          />
          <Grid item  sm={7} xs={12} style={{padding:0}}>
              <ScrollableTabsButtonForce/>
          </Grid>
        </Grid>
        </Container>
      }
      </ActionCableProvider>
        )
}

{/* <div className="" style={{
            padding:"20px",
            width:"100%",
            height:"auto",
            // background:"#333"
            // タブ(グラフ、タスクの確認、タイムライン,DM)
            // グラフ
            // 棒グラフ 円グラフ
            // セレクトボックス(集計する形、起点となる日付)
            // グラフ内のデータで総合計画時間、総合学習時間、総合達成率を出す
            // タスクの確認
            // 計画したタスクの確認
            // タイムライン
            // フォローしたユーザの今日のタスクを表示
            // DM
            // DMしたいユーザ
            // 相互フォローした同士でチャットができる
          }}> */}

{/* <Grid item  sm={5} xs={12} style={{}} justify="center">
          <div className="" style={{
            width:"100%",
            height:"auto",
            // background:"#444",
          }}
            // <>プロフィール
            // アイコン
            // 名前
            // フォロ- フォロワー リンク
            // フォロー・アンフォローボタン or アカウント設定ボタン
          >
            <div className="" style={{
              display:"flex",
              justifyContent:"center"
            }}>
               {
                 imageUrl  !=""  ?
                  <Image image={imageUrl} width={"200px"} height={"200px"}/>
                    :
                  <IconButton style={{ display: 'block' }} >
                    <Avatar/>
                  </IconButton>
                }
            </div>
            <div className="" style={{
              padding:"20px"
            }}>
              <Typography component="h3" variant="h5" align="center">
                {anotherUser.name ? anotherUser.name : name}
              </Typography>
                <div className="" style={{
                  display:"flex",
                  justifyContent:"center",
                  fontSize:"20px"
                }}>
                  <a href="" style={{
                  margin:"10px"
                }}>フォロー</a>
                  <a href="" style={{
                  margin:"10px"
                }}>フォロワー </a>
                </div>
                <div className="" style={
                  {
                    width:"50%",
                    margin:"auto"
                  }
                }>
                  {
                    anotherUserString?
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    フォローする
                  </Button>
                  :
                  <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={
                    ()=>dispatch(push("/users/setting"))
                  }
                >
                  設定
                </Button>
                  }
                </div>
            </div>
          </div>
        </Grid> */}
