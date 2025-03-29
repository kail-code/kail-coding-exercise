import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Root } from "./Root";
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
