import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "styles/index.css";
import App from "./components/App";
import Firebase, { FirebaseContext } from "./components/Auth/Firebase";
import * as serviceWorker from "./serviceWorker";

const app = (
  <FirebaseContext.Provider value={new Firebase()}>
    <Provider store={store}>
      <App />
    </Provider>
  </FirebaseContext.Provider>
);
ReactDOM.render(app, document.getElementById("root"));
serviceWorker.unregister();
