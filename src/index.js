import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ReactKeycloakProvider } from "@react-keycloak/web";

import { MaterialUIControllerProvider } from "context";
import { Provider } from "react-redux";
import { store } from "./config/store";

import keycloak from "./config/keycloak";

import App from "App";
import "./style.css";

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ReactKeycloakProvider authClient={keycloak}>
        <MaterialUIControllerProvider>
          <App />
        </MaterialUIControllerProvider>
      </ReactKeycloakProvider>
    </BrowserRouter>
  </Provider>
);
