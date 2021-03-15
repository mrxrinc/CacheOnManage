import { createStore, applyMiddleware, compose } from "redux";
import Reactotron from "../../ReactotronConfig";
// Reducers
import reducers from "./index.reducer";
// Sagas
import sagas from "./index.sagas";
// List of middleware
import middlewares, { sagaMiddleware } from "./index.middleware";

const appStore = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  compose(applyMiddleware(...middlewares), Reactotron.createEnhancer())
);
// Run redux-saga middleware and apply all forked sagas that we have created
sagaMiddleware.run(sagas);

export default appStore;
