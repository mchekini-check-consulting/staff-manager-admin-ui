import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ReactKeycloakProvider } from "@react-keycloak/web";

import App from "App";

import keycloak from "./keycloak";

import { MaterialUIControllerProvider } from "context";

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <ReactKeycloakProvider authClient={keycloak}>
      <MaterialUIControllerProvider>
        <App />
      </MaterialUIControllerProvider>
    </ReactKeycloakProvider>
  </BrowserRouter>
);
