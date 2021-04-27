import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { settingsAccount } from '../reducks/users/operations'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { IconButton, Link } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import { DirectUpload } from 'activestorage'

const SignupSchema = yup.object().shape({
  email: yup.string().email().required('This field is required.'),
})

const useStyles = makeStyles((theme) => ({
  // "@global": {
  //   body: {
  //     backgroundColor: theme.palette.common.white
  //   }
  // },
  paper: {
    display: 'flex',
    // flexDirection: "column",
    // alignItems: "center",
    // boxShadow: "0px 3px 6px #0000001A",
    // border:"1px solid  #ccc",
    // padding: "50px",
    marginTop: theme.spacing(14),
    [theme.breakpoints.down('xs')]: {
      // border: "none",
      // padding: "40px",
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
    margin: theme.spacing(4, 0, 2),
  },
  logo: {
    marginRight: '10px',
    height: '50px',
  },
  boild: {
    fontWeight: 800,
  },
  backColor: {
    backgroundColor: 'white',
    marginTop: '5%',
    boxShadow: '0px 3px 6px #0000001A',
  },
  toolbar: theme.mixins.toolbar,
  icon: {
    // width:"300px",
    // height:"300px",
    width: '200px',
    height: '200px',
    [theme.breakpoints.down('xs')]: {
      width: '200px',
      height: '200px',
    },
  },
  title: {
    textAlign: 'center',
  },
  display: {
    // display: "block",
    // [theme.breakpoints.down('xs')]:{
    //   display: "none",
    //  },
  },
}))

type propTypes = {
  image: string
  width: string
  height: string
}
export const Image = ({ image, width, height }: propTypes) => {
  return (
    <img
      src={image}
      style={{ width: width, height: height, borderRadius: '200px', marginTop: '20px' }}
      alt="プロフィール画像"
    />
  )
}

export const Setting = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const userSeletor = (state) => state.users
  const users = useSelector(userSeletor)
  const email = users.uid
  const name = users.name
  const id = users.id
  const avatar = users.avatar
  const [imageUrl, setImageUrl] = useState(avatar)
  const handleSubmit = (values) => {
    if (values.image == avatar) {
      dispatch(settingsAccount(values, values.image))
    } else {
      avatar != '' && values.image == '' ? deleteFile(values, id) : uploadFile(values, id)
    }
  }

  const uploadFile = (values, id) => {
    const upload = new DirectUpload(values.image, 'http://localhost:3000/rails/active_storage/direct_uploads')
    upload.create(async (error, blob) => {
      console.log(blob)
      if (error) {
        return error
      } else {
        const res = await fetch('http://localhost:3000/rails/active_storage/direct_uploads', {
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({ blob: blob, user_id: id }),
        })
        const data = await res.json()
        const imageUrl = data.imageUrl
        dispatch(settingsAccount(values, imageUrl))
      }
    })
  }

  const deleteFile = async (values, id) => {
    const res = await fetch('http://localhost:3000/rails/active_storage/direct_uploads', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ id: id }),
    })
    const data = await res.json()
    dispatch(settingsAccount(values, ''))
  }

  return (
    <Container component="main" maxWidth="lg" className={classes.backColor}>
      <CssBaseline />
      <Formik
        initialValues={{
          name: name,
          email: email,
          image: imageUrl,
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, handleChange, values, setFieldValue, touched }) => (
          <Form className={classes.form}>
            <Grid container spacing={5} justify="center">
              <Grid item sm={12} xs={12}>
                <Typography component="h1" variant="h5" className={`${classes.boild}  ${classes.title}`}>
                  ユーザー設定
                </Typography>
              </Grid>
              <Grid item sm={6} xs={12} container justify={'center'}>
                <div className="">
                  {values.image != '' ? (
                    <Image image={imageUrl} width={'200px'} height="200px" />
                  ) : (
                    <IconButton style={{ display: 'block' }}>
                      <Avatar className={classes.icon} />
                    </IconButton>
                  )}
                  <div className="" style={{ display: 'flex', justifyContent: 'center',padding:"20px" }}>
                    <label htmlFor="image">
                      <TextField
                        type="file"
                        onChange={(e: any) => {
                          const files = e.target.files![0]
                          const imageUrl = URL.createObjectURL(files)
                          setFieldValue('image', files)
                          setImageUrl(imageUrl)
                        }}
                        id="image"
                        label="image"
                        name="image"
                        style={{ display: 'none' }}
                      />

                      <Fab color="primary" size="small" component="span" aria-label="add" style={{margin:"0 10px"}}>
                        <AddIcon />
                      </Fab>
                    </label>
                    {values.image != '' && (
                      <Fab
                        color="primary"
                        size="small"
                        component="span"
                        style={{margin:"0 10px"}}
                        onClick={() => {
                          setFieldValue('image', '')
                          setImageUrl('')
                        }}
                      >
                        <CloseIcon />
                      </Fab>
                    )}
                  </div>
                </div>
              </Grid>
              <Grid item sm={6} xs={12} container spacing={4} style={{ padding: '0' }}>
                <div className={classes.toolbar} />
                <Grid item xs={12} />
                <Grid item sm={10} xs={12} md={10}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="name"
                    label="name"
                    name="name"
                    autoComplete="name"
                    value={values.name}
                    helperText={errors.name && touched.name ? errors.name : null}
                  />
                </Grid>
                <Grid item md={10} sm={10} xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={values.email}
                    // helperText={
                    //   errors.password && touched.password
                    //     ? errors.password
                    //     : null
                    // }
                  />
                </Grid>
                <Grid item md={10} sm={10} xs={12}>
                  <Link href="/login/reset">パスワードの変更はこちら</Link>
                </Grid>
                <Grid item md={10} sm={10} xs={12}>
                  <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    変更
                  </Button>
                </Grid>
              </Grid>
              <Grid sm={10} xs={12} />
              <Grid item xs={12} />
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  )
}
