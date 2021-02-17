import {createStore,combineReducers,applyMiddleware,compose} from "redux"
import { connectRouter,routerMiddleware } from "connected-react-router";
import { UsersReducer } from "../users/reducers";
import persistState from "redux-localstorage";
import logger from "redux-logger";
import thunk from "redux-thunk";

export const configureStore=(history)=>
  compose(persistState())(createStore)
  (
    combineReducers({
      users:UsersReducer,
      router:connectRouter(history)
    }),
    applyMiddleware(
      routerMiddleware(history),
      logger,
      thunk
    )
  )
