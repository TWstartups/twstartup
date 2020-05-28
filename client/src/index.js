import React from "react";
import App from "./components/App";
import ReactDOM from "react-dom";
import "./assets/scss/styles.scss";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware} from "redux";
import reducers from "./reducers";
import history from './history';
const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <HashRouter history={history}>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
