import ContentLayout from "components/ContentLayout";
import ContentNavbar from "components/ContentNavbar";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { useGetActivitiesQuery } from "services/activity/activity.api.slice";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const columns = [
  {
    field: "collaboratorFullName",
    headerName: "Collaborateur",
    valueGetter: (params) => {
      return `${params.row.collaboratorFirstName || ""} ${params.row.collaboratorLastName || ""}`;
    },
    flex: 1,
  },
  { field: "declaredDays", headerName: "jours déclarés", flex: 1 },
  { field: "billedDays", headerName: "jours facturés", flex: 1 },
  { field: "rttRedemption", headerName: "rachat d'RTT", flex: 1 },
  { field: "absenceDays", headerName: "jours d'absence", flex: 1 },
  { field: "extraHoursInDays", headerName: "heures supplémentaires", flex: 1 },
  { field: "onCallHoursInDays", headerName: "heures d'astreint", flex: 1 },
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
  const { data, error, isLoading } = useGetActivitiesQuery();
  return (
    <ContentLayout>
      <ContentNavbar />
      {error ? (
        toast.error("Oups, une erreur serveur c'est produite en essayant de récupérer les CRA.", {
          position: toast.POSITION.TOP_RIGHT,
        })
      ) : isLoading ? (
        <CircularProgress />
      ) : data ? (
        <DataGrid
          rows={data.map((item, index) => ({ ...item, id: index }))}
          columns={columns}
          sx={{
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
            },
          }}
          pageSizeOptions={[10, 25, 50, 100]}
        />
      ) : null}
    </ContentLayout>
  );
}

export default Activity;
