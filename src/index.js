import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { EasyModeProvider } from "./contexts/easyModeContext/EasyModeContext";
import { LeadersProvider } from "./contexts/leaderContext/LeaderContext";
import UserProvider from "./contexts/userContext/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <EasyModeProvider>
      <LeadersProvider>
        <UserProvider>
          <RouterProvider router={router}></RouterProvider>
        </UserProvider>
      </LeadersProvider>
    </EasyModeProvider>
  </React.StrictMode>,
);
