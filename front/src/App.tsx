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
const App=(props):JSX.Element=>{

  return (
    <>
      <Header/>
        <main>
          <Router>
            <Switch>
              <Route exact path="/">
                <Home/>
              </Route>
              <Route exact path="/about">
                <About/>
              </Route>
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
