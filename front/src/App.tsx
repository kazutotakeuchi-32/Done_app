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


export const App =():JSX.Element=>{

  return (
    <>
      <Header/>
        <main>
            <Switch>
              <PrivateRoute exact path="/" component={Home}/>
              {/* <PrivateRoute exact path="/profile/:userId" component={ProfilePage}/>  */}
              <Route exact path="/signup">
                <Signup/>
              </Route>
              <Route exact path="/login">
                <Login/>
              </Route>
              {/* confrimation/mail */}
              <Route exact path="/login/reset">
                <Reset/>
              </Route>
              <Route exact path="/confirmation/mail">
                <ConfirmationMail/>
              </Route>
              <Route exact path="/confirmation/password">
                <ConfirmationPassword/>
              </Route>
              <PrivateRoute exact path="/users/:id" component={Mypage} />
              {/* <Route  path="/users/:id">
                <Mypage/>
              </Route> */}
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
