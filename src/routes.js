import Activite from "layouts/Activite";
import Collaborateur from "layouts/Collaborateur";
import Facture from "layouts/Facture";
import FichesPaie from "layouts/FichesPaie";
import Justificatif from "layouts/Justificatif";
import Documentation from "layouts/documentation";

import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Activité",
    key: "activite",
    icon: <Icon fontSize="small">bubble_chart</Icon>,
    route: "/activite",
    component: <Activite />,
  },
  {
    type: "collapse",
    name: "Fiches De Paie",
    key: "fiches_paie",
    icon: <Icon fontSize="small">euro</Icon>,
    route: "/fiches_paie",
    component: <FichesPaie />,
  },
  {
    type: "collapse",
    name: "Justificatif",
    key: "justificatif",
    icon: <Icon fontSize="small">badge</Icon>,
    route: "/Justificatif",
    component: <Justificatif />,
  },
  {
    type: "collapse",
    name: "Facture",
    key: "facture",
    icon: <Icon fontSize="small">receipt</Icon>,
    route: "/facture",
    component: <Facture />,
  },
  {
    type: "collapse",
    name: "Collaborateur",
    key: "collaborateur",
    icon: <Icon fontSize="small">groups</Icon>,
    route: "/collaborateur",
    component: <Collaborateur />,
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
