import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import * as firebase from "firebase";

import App from "./components/App";
import reducers from "./reducers";

// firebase setup
const firebaseConfig = {
  apiKey: "AIzaSyB6059Dd9NGi34Wy4uH1L2tPKStWHg0Ww8",
  authDomain: "medify-bad90.firebaseapp.com",
  databaseURL: "https://medify-bad90.firebaseio.com",
  projectId: "medify-bad90",
  storageBucket: "medify-bad90.appspot.com",
  messagingSenderId: "680694971585",
  appId: "1:680694971585:web:6fab164fac4e1b6517e840"
};

firebase.initializeApp(firebaseConfig);

// redux dev tools setup
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

// apps setup
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
