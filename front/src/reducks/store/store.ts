import {createStore,combineReducers,applyMiddleware} from "redux"
import { connectRouter,routerMiddleware } from "connected-react-router";
import { UsersReducer } from "../users/reducers";
import logger from "redux-logger";
import thunk from "redux-thunk";

export const configureStore=(history)=>
  createStore(
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
