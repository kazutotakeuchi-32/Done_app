import React from 'react'
import { Header } from './components/Header/Header'
import { connect } from 'react-redux';
import { Footer } from './components/Footer/Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route,} from "react-router-dom";
import { Home } from './templates/Home';
import { About } from './templates/About';
import { Login } from './templates/Login';
import { Signup } from './templates/Signup';
import { Mypage } from './templates/Mypage';
import { PrivateRoute } from './components/PrivateRoute';
const App=(props):JSX.Element=>{
  return (
    <>
      <Header/>
        <main>
          <Router>
            <Switch>
              <PrivateRoute exact path="/" component={Home}/>
          {/* <PrivateRoute exact path="/profile/:userId" component={ProfilePage}/>  */}
              {/* <Route exact path="/">
                <Home/>
              </Route> */}
              <Route exact path="/signup">

                <Signup/>
              </Route>
              <Route exact path="/login">
                <Login/>
              </Route>
              <PrivateRoute exact path="/users/:id" component={Mypage} />
              {/* <Route  path="/users/:id">
                <Mypage/>
              </Route> */}
            </Switch>
          </Router>
        </main>
      <Footer/>
    </>

  )
}


const mapStateToProps = state => {
  return { users: state.users }
}
const mapDispatchToProp=dispatch=>{
  return{
  }
}
const mergeProps = (mapStatToProps) => {
  // console.log(mapStateToProps);
  return {
    mapStatToProps:{
      ...mapStatToProps,
      users:{
        ...mapStatToProps.users,
        id:1
      }
    }

  }
}


export default connect(mapStateToProps, mapDispatchToProp,mergeProps)(App)
