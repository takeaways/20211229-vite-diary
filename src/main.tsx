import React from "react";
import ReactDOM from "react-dom";
import "react-toastify/dist/ReactToastify.css";

import App from "app/App";

import ToastRoot from "components/ToastRoot";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
    <ToastRoot />
  </React.StrictMode>,
  document.getElementById("root"),
);
