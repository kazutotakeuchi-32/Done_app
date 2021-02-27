import React from "react"
import { useDispatch , useSelector} from "react-redux";
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
import { signIn } from "../reducks/users/operations";
import { push } from "connected-react-router";
import  Logo from "../assets/images/done.png";

const SignupSchema = yup.object().shape({
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0px 3px 6px #0000001A",
    // border:"1px solid  #ccc",
    padding: "50px",
    marginTop: theme.spacing(14),
    [theme.breakpoints.down('xs')]:{
      // border: "none",
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

export const Login = () => {
  const classes = useStyles();
  const userSelector = state=>state.users
  const actived = useSelector(userSelector).actived
  const dispatch = useDispatch()
  if (actived) {
    dispatch(push("/"))
  }
  const handleSubmit =(value)=>{
    dispatch(signIn(value.email,value.password))
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        <img src={Logo} className={classes.logo}  width="auto" />
      </Typography>
        <Typography component="h1" variant="h5" className={classes.boild}>
          {/* Login */}
          ログイン
        </Typography>
        <Formik
          initialValues={{
            email: "",
            password: ""
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, handleChange, touched }) => (
            <Form className={classes.form}>
              <Grid container spacing={2}>
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
                <Grid  item xs={12}>
                  <Link href="/signup">アカウント登録はこちら</Link>
                </Grid>
                <Grid  item xs={12}>
                  <Link href="/login/reset">パスワードを忘れた方はこちら </Link>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                ログインする
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};
