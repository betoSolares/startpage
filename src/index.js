import React from "react";
import ReactDOM from "react-dom";

import App from "./app";

const root = document.getElementById("root");

const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

ReactDOM.render(app, root);
