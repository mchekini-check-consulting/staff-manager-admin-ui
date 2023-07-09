import Activite from "layouts/Activite";
import FichePaie from "layouts/FichePaie";
import Collaborateur from "layouts/Collaborateur";
import Facture from "layouts/Facture";
import Justificatif from "layouts/Justificatif";
import Documentation from "layouts/documentation";
import Clients from "layouts/Clients";

import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Validation CRA",
    key: "activite",
    icon: <Icon fontSize="small">bubble_chart</Icon>,
    route: "/activite",
    component: <Activite />,
  },
  {
    type: "collapse",
    name: "Fiche De Paie",
    key: "fiche_paie",
    icon: <Icon fontSize="small">euro</Icon>,
    route: "/fiche_paie",
    component: <FichePaie />,
  },
  {
    type: "collapse",
    name: "Justificatifs",
    key: "justificatif",
    icon: <Icon fontSize="small">badge</Icon>,
    route: "/justificatif",
    component: <Justificatif />,
  },
  {
    type: "collapse",
    name: "Gestion des Factures",
    key: "facture",
    icon: <Icon fontSize="small">receipt</Icon>,
    route: "/facture",
    component: <Facture />,
  },
  {
    type: "collapse",
    name: "Collaborateurs et Missions",
    key: "collaborateur",
    icon: <Icon fontSize="small">groups</Icon>,
    route: "/collaborateur",
    component: <Collaborateur />,
  },
  {
    type: "collapse",
    name: "Clients",
    key: "clients",
    icon: <Icon fontSize="small">question_mark</Icon>,
    route: "/clients",
    component: <Clients />,
  },
  {
    type: "collapse",
    name: "Documentation",
    key: "documentation",
    icon: <Icon fontSize="small">question_mark</Icon>,
    route: "/documentation",
    component: <Documentation />,
  },
];

export default routes;
