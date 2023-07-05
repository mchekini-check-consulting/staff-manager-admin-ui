import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";
import Sidenav from "components/Sidenav";
import theme from "assets/theme";
import routes from "routes";

import { useKeycloak } from "@react-keycloak/web";
import Loader from "components/Loader";
import { Box, Typography } from "@mui/material";

export default function App() {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) {
    return (
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"} rowGap={4} marginTop={4}>
        <Typography variant="h6">En cours de chargement...</Typography>
        <Loader />
      </Box>
    );
  }

  useEffect(() => {
    if (!keycloak.authenticated) {
      keycloak.login();
    }
  }, [keycloak]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Sidenav brandName="Staff Manager Admin" routes={routes} />
      <Routes>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/activite" />} />
      </Routes>
    </ThemeProvider>
  );
}
