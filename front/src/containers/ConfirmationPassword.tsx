import  React from "react";
import { useDispatch } from "react-redux";
import { updatePassword } from "../reducks/users/operations";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Formik, Form } from "formik";
import * as yup from "yup";
import  Logo from "../assets/images/done.png";

const SignupSchema = yup.object().shape({
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

export const ConfirmationPassword=()=>{
  const classes = useStyles();
  const dispatch = useDispatch()
  const handleSubmit =(value)=>{
    if (/uid/.test(location.href)
        &&/access-token/.test(location.href)
        &&/client/.test(location.href)
    ) {
      const url  = new URL(location.href);
      const uid  = url.searchParams.get("uid")
      const token = url.searchParams.get("access-token")
      const client = url.searchParams.get("client")
      console.log(uid);
      console.log(token);
      console.log(client);
      console.log("11");

      dispatch(updatePassword(
        value.password,
        value.confrimationPassword,{
            uid:uid,
            token:token,
            client:client
        }
      ))
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        <img src={Logo} alt="" className={classes.logo}/>
      </Typography>
        <Typography component="h1" variant="h5" className={classes.boild}>
          パスワード変更
        </Typography>

        <Formik
          initialValues={{
            password: "",
            confrimationPassword:""
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, handleChange, touched }) => (
            <Form className={classes.form} >
              <Grid container spacing={2} >

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
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
               確定する
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  )
}
