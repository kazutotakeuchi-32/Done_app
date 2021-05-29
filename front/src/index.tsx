import React from 'react'
import {render} from 'react-dom'
import  {Provider} from "react-redux";
// import { Router,Route,browserHistory} from 'react-router-dom'
import './assets/index.css'
import {App} from './App'
import reportWebVitals from './reportWebVitals'
import { createBrowserHistory } from "history";
import { ConnectedRouter} from "connected-react-router";
import { configureStore } from './reducks/store/store';
import { CookiesProvider } from "react-cookie";
const story = createBrowserHistory()
const store = configureStore(story)

render(
  <Provider store={store} >
    <ConnectedRouter history={story} >
      <CookiesProvider>
          <App/>
      </CookiesProvider>
    </ConnectedRouter>
  </Provider>
  ,
  document.getElementById('root')
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
