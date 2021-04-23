import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { Fab, MenuItem, Modal } from '@material-ui/core'
import Logo from '../assets/images/done.png'
import { fetchPostDraftLearning } from '../reducks/draft_learns/operations'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    // width:"100%"
    // marginTop: theme.spacing(14),
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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  logo: {
    marginRight: '10px',
    height: '50px',
  },
  boild: {
    fontWeight: 800,
  },
  box: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
  gridRoot: {
    padding: '50px 10px',
  },
  fabSize: {
    width: '70px',
    height: '70px',
  },
  modalPaper: {
    position: 'fixed',
    width: 'auto',
    height: 'auto',
    // width:"100%",
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    [theme.breakpoints.down('xs')]: {
      width: '90%',
      height: 'auto',
    },
  },
}))


export const ModalForm = () => {
  const handleSubmidPreview = () => {
    ('')
  }
  const classes = useStyles()
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

  return (
    <Modal
    open={true}
    onClose={()=>false}
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
  >
    <div style={getModalStyle()} className={classes.modalPaper} >
    <div className={classes.paper} style={{ margin: '0', boxShadow: 'none' }}>
      <CloseIcon
        style={{ position: 'absolute', right: '20px', top: '10px' }}
        // onClick={()=>setOpen(false)
      />
      <Typography component="h1" variant="h5">
        <img src={Logo} alt="" className={classes.logo} />
      </Typography>
      <Typography component="h1" variant="h5" className={classes.boild}>
        学習計画
      </Typography>
      <Formik
        initialValues={{
          subject: '',
          title: '',
          content: '',
          time: '',
        }}
        // validationSchema={SignupSchema}
        onSubmit={handleSubmidPreview}
        enableReinitialize={false}
      >
        {({ errors, handleChange, values, touched, setFieldValue }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
              <Grid item sm={6} xs={12}>
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

              <Grid item sm={6} xs={12}>
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
              <Grid item xs={12}></Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              // className={classes.submit}
            >
              追加
            </Button>
          </Form>
        )}
      </Formik>
    </div>
    </div>
    </Modal>
  )
}
