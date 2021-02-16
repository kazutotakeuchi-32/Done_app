import React, { useState } from 'react'
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
import { Confirmation } from './containers/Confirmation';
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
              <Route exact path="/confirmation">
                <Confirmation/>
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
