import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.scss";

const appProps = {
  jitux: { app: { apiUrl: "" } },
  baseHref: "/"
};

ReactDOM.render(
  <React.StrictMode>
    <App {...appProps} />
  </React.StrictMode>,
  document.getElementById("root")
);
