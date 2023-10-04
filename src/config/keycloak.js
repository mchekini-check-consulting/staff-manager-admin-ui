import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://ci.check-consulting.net:10000/auth/",
  realm: "staff-manager-admin",
  clientId: "staff-manager-admin-client",
});

export default keycloak;
