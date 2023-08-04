import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "https://keycloak.check-consulting.net/auth/",
  realm: "staff-manager-admin",
  clientId: "staff-manager-admin-client",
});

export default keycloak;
