import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { useKeycloak } from "@react-keycloak/web";
import { Box, Typography } from "@mui/material";
import { useFetchVersionQuery } from "services/general.api";

import CssBaseline from "@mui/material/CssBaseline";
import Sidenav from "components/Sidenav";
import theme from "assets/theme";
import routes from "./config/routes";
import { ToastContainer } from "react-toastify";
import Loader from "components/Loader";
import { tokenPersisted } from "services/general.slice";
import { useDispatch } from "react-redux";

export default function App() {
  const { keycloak, initialized } = useKeycloak();
  const dispatch = useDispatch();

  const { data, isLoading } = useFetchVersionQuery();

  useEffect(() => {
    if (keycloak.authenticated) {
      localStorage.setItem("accessToken", keycloak.token);
      localStorage.setItem("refreshToken", keycloak.refreshToken);
      dispatch(tokenPersisted(true));
    }

    if (!keycloak.authenticated && initialized) {
      keycloak.login();
    }
  }, [keycloak, initialized]);

  if (!initialized || isLoading) {
    return (
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"} rowGap={4} marginTop={4}>
        <Typography variant="h6">En cours de chargement...</Typography>
        <Loader />
      </Box>
    );
  }

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
      <Sidenav brandName={`Staff Manager Admin ${data?.version ?? ""}`} routes={routes} />
      <Routes>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/activite" />} />
      </Routes>
      <ToastContainer />
    </ThemeProvider>
  );
}
