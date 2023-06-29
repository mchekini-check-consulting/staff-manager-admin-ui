import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { useMaterialUIController } from "context";

import CssBaseline from "@mui/material/CssBaseline";
import Sidenav from "examples/Sidenav";
import theme from "assets/theme";
import themeDark from "assets/theme-dark";
import routes from "routes";

export default function App() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

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
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      <Sidenav brandName="Staff Manager Admin" routes={routes} />
      <Routes>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/activite" />} />
      </Routes>
    </ThemeProvider>
  );
}
