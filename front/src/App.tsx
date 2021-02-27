import React, { useEffect, useState } from 'react'
import { Header } from './components/Header/Header'
import { connect } from 'react-redux';
import { Footer } from './components/Footer/Footer';
import {
  Switch,
  Route,} from "react-router-dom";
import { Home } from './containers/Home';
import { About } from './templates/About';
import { Login } from './containers/Login';
import { Signup } from './containers/Signup';
import { Mypage } from './containers/Mypage';
import { PrivateRoute } from './components/PrivateRoute';
import { Reset } from './containers/Reset';
import { ConfirmationMail } from './containers/ConfirmationMail';
import { ConfirmationPassword } from './containers/ConfirmationPassword';
import { useSelector ,useDispatch } from "react-redux";
import { activateAccount } from './reducks/users/operations';
import { push } from 'connected-react-router';
import { ConfirmationResetMail } from './containers/ConfirmationResetMail';
import { Setting } from './containers/Setting';
import { Sidbar } from './components/Sidbar/Sidbar';


export const App =():JSX.Element=>{
  return (
    <>
        <Header/>
        <main>
          <Switch>
              <PrivateRoute exact path="/" component={Home}/>
              <PrivateRoute exact path="/users/setting" component={Setting}/>
              <PrivateRoute exact path="/users/:id" component={Mypage} />
              <Route exact path="/signup">
                <Signup/>
              </Route>
              <Route exact path="/admin/login">
                <Login />
              </Route>
              <Route exact path="/login">
                <Login/>
              </Route>
              <Route exact path="/login/reset">
                <Reset/>
              </Route>
              <Route exact path="/confirmation/mail">
                <ConfirmationMail/>
              </Route>
              <Route exact path="/confirmation/reset">
                <ConfirmationResetMail/>
              </Route>
              <Route exact path="/confirmation/password">
                <ConfirmationPassword/>
              </Route>
            </Switch>
        </main>
      <Footer/>
    </>
  )
}


// const mapStateToProps = state => {
//   return { users: state.users }
// }
// const mapDispatchToProp=dispatch=>{
//   return{
//   }
// }
// const mergeProps = (mapStatToProps) => {
//   // console.log(mapStateToProps);
//   return {
//     mapStatToProps:{
//       ...mapStatToProps,
//       users:{
//         ...mapStatToProps.users,
//         id:1
//       }
//     }

//   }
// }


// export default connect(mapStateToProps, mapDispatchToProp,mergeProps)(App)
