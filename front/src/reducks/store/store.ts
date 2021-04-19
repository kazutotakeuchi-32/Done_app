import {createStore,combineReducers,applyMiddleware,compose} from "redux"
import { connectRouter,routerMiddleware } from "connected-react-router";
import { UsersReducer } from "../users/reducers";
import persistState from "redux-localstorage";
import logger from "redux-logger";
import thunk from "redux-thunk";
import {LearnsReducer} from "../learns/reducers"
import { DraftLearnsReducer } from "../draft_learns/reducers";
export const configureStore=(history)=>
  compose(persistState())(createStore)
  (
    combineReducers({
      users:UsersReducer,
      learns:LearnsReducer,
      draftLearns:DraftLearnsReducer,
      router:connectRouter(history)
    }),
    applyMiddleware(
      routerMiddleware(history),
      logger,
      thunk
    )
  )
