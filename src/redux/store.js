import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import rootReducer from "./reducers";
import { rootSaga } from "./sagas";

const sagaMiddleware = createSagaMiddleware();

// redux logger config for the development

const middlewares = [];
if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);
  middlewares.push(logger);
}

let initalState = {};
export const store = createStore(
  rootReducer,
  initalState,
  composeWithDevTools(applyMiddleware(sagaMiddleware, ...middlewares))
);

sagaMiddleware.run(rootSaga);
