import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ActiveStepProvider from "./context/ActiveStepProvider";
import UserClientFormProvider from "./context/UserClientFormProvider";
import UserListProvider from "./context/UserListProvider";
import "./index.css";
import "./styles/globals.css";

ReactDOM.render(
  <React.StrictMode>
    <UserClientFormProvider>
      <ActiveStepProvider>
        <UserListProvider>
          <App />
        </UserListProvider>
      </ActiveStepProvider>
    </UserClientFormProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
