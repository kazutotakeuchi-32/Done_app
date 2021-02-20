import React, { useEffect } from "react"
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
import { Link } from "@material-ui/core";
import { Email, GridOn } from "@material-ui/icons";
import { signUp } from "../reducks/users/operations";
import { push } from "connected-react-router";
import  Logo from "../assets/images/done.png";

const SignupSchema = yup.object().shape({
  name: yup.string().required("This field is required."),
  email: yup
    .string()
    .email()
    .required("This field is required."),
  password: yup
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
    marginTop: theme.spacing(14),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0px 3px 6px #0000001A",
    padding: "50px",
    [theme.breakpoints.down('xs')]:{
      border: "none",
      padding: "40px",
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
  }
}));

export const Signup = (props) => {
  // let token;
  const classes = useStyles();
  const dispatch = useDispatch()
  const userSelector = state=>state.users.actived
  const actived = useSelector(userSelector)
  if (actived) {
    dispatch(push("/"))
  }
  const handleSubmid = ({name,email,password,confrimationPassword})=>{
    dispatch(signUp(name,email,password,confrimationPassword))
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
       <Typography component="h1" variant="h5">
        <img src={Logo} alt="" className={classes.logo}/>
      </Typography>

        <Typography component="h1" variant="h5" className={classes.boild} >
         アカウント登録
        </Typography>

        <Formik
          initialValues={{
            name:"",
            email: "",
            password: "",
            confrimationPassword:""
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmid}
        >
          {({ errors, handleChange, touched }) => (
            <Form className={classes.form} >
              <Grid container spacing={2} >
                <Grid item xs={12} >
                  <TextField
                    autoComplete="name"
                    name="name"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="name"
                    label="Name"
                    autoFocus
                    helperText={
                      errors.name && touched.name
                        ? errors.name
                        : null
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    helperText={
                      errors.email && touched.email ? errors.email : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    helperText={
                      errors.password && touched.password
                        ? errors.password
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    name="confrimationPassword"
                    label="Confirmation password"
                    type="password"
                    id="confirmationPassword"
                    autoComplete="current-password"
                    helperText={
                      errors.password && touched.password
                        ? errors.password
                        : null
                    }
                  />
                </Grid>
                <Grid  item xs={12}>
                  <Link href="login">ログインはこちら</Link>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                登録
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};
