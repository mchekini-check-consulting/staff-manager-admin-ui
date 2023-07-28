import ContentLayout from "components/ContentLayout";
import ContentNavbar from "components/ContentNavbar";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Button } from "@mui/material";
import { useGetActivitiesQuery } from "services/activity/activity.api.slice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import CustomDataGrid from "components/CustomDataGrid";

const columns = [
  {
    field: "collaboratorFullName",
    headerName: "Collaborateur",
    valueGetter: (params) => {
      return `${params.row.collaboratorFirstName || ""} ${params.row.collaboratorLastName || ""}`;
    },
    flex: 1,
  },
  { field: "declaredDays", headerName: "Jours Déclarés", flex: 1 },
  { field: "billedDays", headerName: "Jours Facturés", flex: 1 },
  { field: "rttRedemption", headerName: "Rachat de RTT", flex: 1 },
  { field: "absenceDays", headerName: "Jours d'absence", flex: 1 },
  { field: "extraHoursInDays", headerName: "Heures Supplémentaires (j)", flex: 1 },
  { field: "onCallHoursInDays", headerName: "Heures d'astreintes (j)", flex: 1 },
  {
    field: "actions",
    headerName: " ",
    flex: 1.5,
    renderCell: () => (
      <Box sx={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
        <Button variant="contained" color="success" size="small" sx={{ color: "green" }}>
          Valider
        </Button>
        <Button variant="contained" color="error" size="small" sx={{ color: "red" }}>
          Rejeter
        </Button>
      </Box>
    ),
  },
];

function Activity() {
  const { tokenPersisted } = useSelector((state) => state.generalSlice);

  const { data, error, isLoading } = useGetActivitiesQuery(null, {
    skip: !tokenPersisted,
  });

  return (
    <ContentLayout>
      <ContentNavbar />
      {error ? (
        toast.error("Une erreur serveur c'est produite en essayant de récupérer les CRA.", {
          position: toast.POSITION.TOP_RIGHT,
        })
      ) : isLoading ? (
        <CircularProgress />
      ) : data ? (
        <CustomDataGrid
          rows={data.map((item, index) => ({ ...item, id: index }))}
          columns={columns}
        />
      ) : null}
    </ContentLayout>
  );
}

export default Activity;
