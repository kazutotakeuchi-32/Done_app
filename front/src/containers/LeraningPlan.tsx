import React, { useEffect, useState } from "react"
import { useDispatch,useSelector  } from "react-redux";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { Fab, Link, MenuItem, Modal, Select } from "@material-ui/core";
import { Email, GridOn, Height } from "@material-ui/icons";
import { signUp } from "../reducks/users/operations";
import { push } from "connected-react-router";
import  Logo from "../assets/images/done.png";
import { send, title } from "process";
import { Hash } from "crypto";
import { fetchPostDraftLearning } from "../reducks/learns/operations";
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';


const SignupSchema = yup.object().shape({
  title: yup.string().required("This field is required."),
  content: yup
    .string()
    .email()
    .required("This field is required."),
  time: yup
    .string()
    .min(6, "Password is too short.")
    .max(20, "Password is too long.")
    .required("This field is required.")
});

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    // width:"100%"
    // marginTop: theme.spacing(14),
    marginTop: theme.spacing(7),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0px 3px 6px #0000001A",
    padding: "30px 50px",
    [theme.breakpoints.down('xs')]:{
      border: "none",
      padding: "30px 30px",
      marginTop: theme.spacing(6),
     },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  logo:{
    marginRight:"10px",
    height:"50px"
  },
  boild:{
    fontWeight:800
  },
  box:{
    display:"flex",
    [theme.breakpoints.down('xs')]:{
      display:"block"
     },
  },
  gridRoot:{
    padding:"50px 10px"
  },
  fabSize:{
    width:"70px",
    height:"70px"
  },
  modalPaper: {
    position: 'fixed',
    width: 'auto',
    height:'auto',
    // width:"100%",
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    [theme.breakpoints.down('xs')]:{
      width:"90%",
      height:"auto"
     }
  },
}));

export const LearningPlan=()=>{
  // const tasks:any = []
  // let sendLearningPlan = "";
  const classes = useStyles();
  const dispatch = useDispatch()
  const [removeTaskId,setRemoveTaskId]=useState(0)
  const [tasks,setTasks]=useState<any>([])
  const[sendLearningPlan,setSendLearningPlan]=useState("")
  const[taskId,setTaskId]=useState(0)
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [currency, setCurrency] = React.useState(11);

  function getModalStyle() {
    const top = 50
    const left = 50

    return {
      padding:`10px 0`,
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmidPreview = (vls,{ resetForm })=>{
    // console.log(vls);
    setTaskId(vls=>{
      return vls+1
    })
    vls.id =taskId+1
    // tasks.push(vls)
    setTasks((ary)=>   [...ary,vls])
    setSendLearningPlan((value)=>value+=`--------------------------------------\nタスク番号:${vls.id}\n学習タスク：${vls.title}\n科目名：${vls.subject}\n学習時間：${vls.time}\n学習内容:${vls.content}\n--------------------------------------\n`)
    // taskId+=1
    setOpen(false)
    console.log(tasks);
    console.log(taskId);
    console.log(sendLearningPlan);
    resetForm()
  }
  const handleSubmid=(values)=>{
    dispatch(fetchPostDraftLearning(tasks))
  }
  const handleClick=(e)=>{

    const removeTask = tasks.filter(task=>(task.id==removeTaskId))[0]
    console.log(removeTask);
    if (!removeTask) {
      return
    }

    setTasks((preAry)=>preAry.filter(task=>task.id!=removeTaskId))
    setSendLearningPlan((preStr)=>preStr.replace(`--------------------------------------\nタスク番号:${removeTask.id}\n学習タスク：${removeTask.title}\n科目名：${removeTask.subject}\n学習時間：${removeTask.time}\n学習内容:${removeTask.content}\n--------------------------------------\n`,""))
  }



  return (
    <div className={classes.box}>
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
       {/* <Typography component="h1" variant="h5">
        <img src={Logo} alt="" className={classes.logo}/>
      </Typography> */}

        <Typography component="h1" variant="h5" className={classes.boild} >
          学習タスクリスト
        </Typography>
      {   tasks.length!= 0 &&
          <Grid item xs={12}>
                  <TextField
                    id="filled-select-currency"
                    select
                    label="Select"
                    value={removeTaskId}
                    // defaultValue={}
                    // onChange={handleChange}
                    onChange={e=> {

                      setRemoveTaskId(parseInt(e.target.value))}}
                    helperText="取り消したいタスクを入力をして下さい"
                    variant="filled"
                  >
                    {
                      tasks.map((task,index)=>(
                        <MenuItem key={index} value={task.id}>
                          タスク番号{task.id}
                        </MenuItem>
                      ))
                    }

                  </TextField>
                </Grid>}

        <Grid container >
          {/* <Grid item xs={12} >
                  <TextField
                    id="filled-select-currency"
                    select
                    label="Select"
                    // onChange={handleChange}
                    helperText="取り消したいタスクを入力をして下さい"
                    variant="filled"
                    onChange={e=> setRemoveTaskId(parseInt(e.target.value))
                    }
                  >
                    {
                      tasks.map((task,index)=>(
                        <option key={index} value={task.id}>
                          タスク番号{task.id+1}
                        </option>
                      ))
                    }
                  </TextField>
            </Grid> */}
          <Grid item xs={6}>
              {/* <Button
                // type="submit"
                // fullWidth
                variant="contained"
                color="primary"
                onClick={handleClick}
                // className={classes.submit}
              >
                タスクを削除
              </Button> */}
           </Grid>
           </Grid>
        <Formik
          initialValues={{
            content:sendLearningPlan,
          }}
          // validationSchema={SignupSchema}
          onSubmit={handleSubmid}
        >
          {({ errors, handleChange, values,touched }) => (
            <Form className={classes.form} >
              <Grid container spacing={2} justify="center">
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={15}
                    value={sendLearningPlan}
                    placeholder="学習内容を具体的に記載してください。"
                    onChange={handleChange}
                    id="content"
                    label="Content"
                    name="content"
                    autoComplete="content"
                    disabled={true}
                    // helperText={
                    //   errors.email && touched.email ? errors.email : null
                    // }
                  />
                </Grid>
                <Grid item xs={12}>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                送信
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      {/* <div className="" style={{display:"flex",justifyContent:"center" } }> */}
        {/* <div className=""> */}
            <Grid spacing={5} container justify={"center"} >
              <Grid  classes={{root:classes.gridRoot}}>
                <Fab color="primary"  component="span" aria-label="add" className={classes.fabSize}  onClick={()=>setOpen(true)}>
                    <AddIcon />
                </Fab>
                </Grid>
                { tasks.length!= 0 &&
                  <Grid  classes={{root:classes.gridRoot}}>
                  <Fab color="primary"  component="span" aria-label="add" className={classes.fabSize} onClick={handleClick}>
                    <CloseIcon />
                  </Fab>
                  </Grid>
                }

              {/* <Grid xs={6} justify="center">
              </Grid>
              <Grid xs={6}>
                <Fab color="primary" size="large" component="span" aria-label="add">
                  <CloseIcon />
                </Fab>
              </Grid> */}
        {/* </div> */}
            {/* <div className=""></div> */}
            </Grid>
      {/* </div>/ */}
    </Container>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
      <div style={modalStyle} className={classes.modalPaper} >

<CssBaseline />
<div className={classes.paper} style={{margin:"0",boxShadow:"none"}} >
<CloseIcon style={{position: 'absolute',right: '20px',top: '10px'}} onClick={()=>setOpen(false)}
/>

 <Typography component="h1" variant="h5">
  <img src={Logo} alt="" className={classes.logo}/>
</Typography>
<Typography component="h1" variant="h5" className={classes.boild} >
    学習計画
  </Typography>
  <Formik
    initialValues={{
      subject:"",
      title:"",
      content:"",
      time:"",
    }}
    // validationSchema={SignupSchema}
    onSubmit={handleSubmidPreview}
    enableReinitialize={false}
  >
    {({ errors, handleChange, values,touched,setFieldValue }) => (
      <Form className={classes.form} >
        <Grid container spacing={2} >
        <Grid item xs={12} >
          <TextField
                autoComplete="title"
                name="title"
                variant="outlined"
                fullWidth
                value={values.title}
                onChange={handleChange}
                id="title"
                label="title"
                autoFocus
                placeholder="学習内容を端的にまとめてください"
                // helperText={
                //   errors.name && touched.name
                //     ? errors.name
                //     : null
                // }
              />
          </Grid>


            <Grid item sm={6} xs={12}   >
              <TextField
                autoComplete="subject"
                name="subject"
                variant="outlined"
                fullWidth
                value={values.subject}
                onChange={handleChange}
                id="subject"
                label="subject"
                autoFocus
                placeholder="科目を入力をしてください"
                // helperText={
                //   errors.name && touched.name
                //     ? errors.name
                //     : null
                // }
              />
              </Grid>

              <Grid item sm={6} xs={12}   >
                <TextField
                  variant="outlined"
                  fullWidth
                  value={values.time}
                  onChange={handleChange}
                  placeholder="学習時間を入力をしてください"
                  name="time"
                  label="time"
                  type="number"
                  id="time"
                  autoComplete="time"
                  // helperText={
                  //   errors.password && touched.password
                  //     ? errors.password
                  //     : null
                  // }
                />
            </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              multiline
              rows={15}
              placeholder="学習内容を具体的に記載してください。"
              value={values.content}
              onChange={handleChange}
              id="content"
              label="Content"
              name="content"
              autoComplete="content"
              // helperText={
              //   errors.email && touched.email ? errors.email : null
              // }
            />
          </Grid>
          <Grid item xs={12}>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          追加
        </Button>
      </Form>
    )}
  </Formik>
</div>


        </div>
      </Modal>
    </div>
  );
}

//  <Container component="main" maxWidth="md">
//       <CssBaseline />
//       <div className={classes.paper}>
//        {/* <Typography component="h1" variant="h5">
//         <img src={Logo} alt="" className={classes.logo}/>
//       </Typography> */}
//         <Typography component="h1" variant="h5" className={classes.boild} >
//           プレビュー
//         </Typography>

//         <Formik
//           initialValues={{
//             content:sendLearningPlan,
//           }}
//           // validationSchema={SignupSchema}
//           onSubmit={handleSubmid}
//         >
//           {({ errors, handleChange, values,touched }) => (
//             <Form className={classes.form} >
//               <Grid container spacing={2} justify="center">
              // <Grid item xs={6}>
              //     <TextField
              //       id="filled-select-currency"
              //       select
              //       label="Select"
              //       // value={}
              //       // onChange={handleChange}
              //       helperText="取り消したいタスクを入力をして下さい"
              //       variant="filled"
              //     >
              //       {
              //         tasks.map((task)=>(
              //           <option key={task.value} value={task.id}>
              //             タスク番号{task.id+1}
              //           </option>
              //         ))
              //       }
              //     </TextField>
              //   </Grid>
//               <Grid item xs={6}>
//               <Button
//                 type="submit"
//                 // fullWidth
//                 variant="contained"
//                 color="primary"
//                 // className={classes.submit}
//               >
//                 タスクを削除
//               </Button>
//               </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     variant="outlined"
//                     fullWidth
//                     multiline
//                     rows={15}
//                     value={sendLearningPlan}
//                     placeholder="学習内容を具体的に記載してください。"
//                     onChange={handleChange}
//                     id="content"
//                     label="Content"
//                     name="content"
//                     autoComplete="content"
//                     disabled={true}
//                     // helperText={
//                     //   errors.email && touched.email ? errors.email : null
//                     // }
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                 </Grid>
//               </Grid>
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 color="primary"
//                 className={classes.submit}
//               >
//                 送信
//               </Button>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </Container>
//
// {/* <Container component="main" maxWidth="md">
// <CssBaseline />
// <div className={classes.paper}>
//  {/* <Typography component="h1" variant="h5">
//   <img src={Logo} alt="" className={classes.logo}/>
// </Typography> */}
// <Typography component="h1" variant="h5" className={classes.boild} >
//     学習計画
//   </Typography>
//   <Formik
//     initialValues={{
//       subject:"",
//       title:"",
//       content:"",
//       time:"",
//     }}
//     // validationSchema={SignupSchema}
//     onSubmit={handleSubmidPreview}
//     enableReinitialize={false}
//   >
//     {({ errors, handleChange, values,touched,setFieldValue }) => (
//       <Form className={classes.form} >
//         <Grid container spacing={2} >
//         <Grid item xs={12} >
//           <TextField
//                 autoComplete="title"
//                 name="title"
//                 variant="outlined"
//                 fullWidth
//                 value={values.title}
//                 onChange={handleChange}
//                 id="title"
//                 label="title"
//                 autoFocus
//                 placeholder="学習内容を端的にまとめてください"
//                 // helperText={
//                 //   errors.name && touched.name
//                 //     ? errors.name
//                 //     : null
//                 // }
//               />
//           </Grid>


//             <Grid item sm={6} xs={12}  spacing={2} >
//               <TextField
//                 autoComplete="subject"
//                 name="subject"
//                 variant="outlined"
//                 fullWidth
//                 value={values.subject}
//                 onChange={handleChange}
//                 id="subject"
//                 label="subject"
//                 autoFocus
//                 placeholder="科目を入力をしてください"
//                 // helperText={
//                 //   errors.name && touched.name
//                 //     ? errors.name
//                 //     : null
//                 // }
//               />
//               </Grid>

//               <Grid item sm={6} xs={12}  spacing={2} >
//                 <TextField
//                   variant="outlined"
//                   fullWidth
//                   value={values.time}
//                   onChange={handleChange}
//                   placeholder="学習時間を入力をしてください"
//                   name="time"
//                   label="time"
//                   type="number"
//                   id="time"
//                   autoComplete="time"
//                   // helperText={
//                   //   errors.password && touched.password
//                   //     ? errors.password
//                   //     : null
//                   // }
//                 />
//             </Grid>
//           <Grid item xs={12}>
//             <TextField
//               variant="outlined"
//               fullWidth
//               multiline
//               rows={15}
//               placeholder="学習内容を具体的に記載してください。"
//               value={values.content}
//               onChange={handleChange}
//               id="content"
//               label="Content"
//               name="content"
//               autoComplete="content"
//               // helperText={
//               //   errors.email && touched.email ? errors.email : null
//               // }
//             />
//           </Grid>
//           <Grid item xs={12}>
//           </Grid>
//         </Grid>
//         <Button
//           type="submit"
//           fullWidth
//           variant="contained"
//           color="primary"
//           className={classes.submit}
//         >
//           追加
//         </Button>
//       </Form>
//     )}
//   </Formik>
// </div>
// </Container> */}
