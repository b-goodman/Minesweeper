import * as React from "react";
// import * as ReactDOM from "react-dom";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store/index";

import GridFC from "./components/GridFC";
import "./index.css";

const NEW_STORE = store(10);

// tslint:disable-next-line: no-expression-statement
render(
  <Provider store={NEW_STORE}>
      <GridFC />
  </Provider>,
  document.getElementById("root")
)
