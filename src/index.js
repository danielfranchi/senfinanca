import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/routes";

import { Storage } from "./ContextAPI/ContextAPI";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Storage>
        {/* <App /> */}
        <Routes />
      </Storage>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
