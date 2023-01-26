import React from "react";
import App from "./App.js";
import reactDOM from "react-dom";
import MainContextProvider from "./context/MainContextProvider.js";
import DisplayContextProvider from "./context/DisplayContextProvider.js";
import { HashRouter } from "react-router-dom";

reactDOM.render(
  <HashRouter>
    <MainContextProvider>
      <DisplayContextProvider>
      <App />
      </DisplayContextProvider>
    </MainContextProvider>
  </HashRouter>,
  document.getElementById("root")
);
