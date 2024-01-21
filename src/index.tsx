import React from "react";
import ReactDOM from "react-dom/client";

// styles imports
import "./index.css";

// local imports
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
