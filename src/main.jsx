import React from "react";
import "react-toastify/dist/ReactToastify.css";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {" "}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
