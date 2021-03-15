import { createStore, compose, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
// import reducers from "./reducers";
import { composeWithDevTools } from "remote-redux-devtools";
import ReduxPromise from "redux-promise";
import reducers from "redux/reducers";

const enhancers = [];
const middleware = [ReduxThunk];

export const composedEnhancers = compose(
  composeWithDevTools(
    applyMiddleware(...middleware, ReduxPromise),
    ...enhancers
  )
);

export const store = createStore(reducers, composedEnhancers);
