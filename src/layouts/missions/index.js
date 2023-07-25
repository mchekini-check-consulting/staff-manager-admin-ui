import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Badge, Box, Button } from "@mui/material";
import ContentLayout from "components/ContentLayout";
import ContentNavbar from "components/ContentNavbar";
import Typography from "components/MD/MDTypography";
import AddMission from "./modals/addMission";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetMissionsQuery } from "services/missions/missionSlice";

const columns = [
  { field: "missionName", headerName: "Nom de la mission", flex: 1 },
  {
    field: "startingDate",
    headerName: "Date de début",
    flex: 0.7,
  },
  {
    field: "endingDate",
    headerName: "Date de fin ",
    flex: 0.7,
  },
  {
    field: "customerName",
    headerName: "Client",
    flex: 0.8,
  },
  {
    field: "customerContactFullName",
    valueGetter: (params) => {
      return `${params.row.customerContactFirstName || ""} ${
        params.row.customerContactLastName || ""
      }`;
    },
    headerName: "Contact",
    flex: 1.5,
  },
  {
    field: "customerContactEmail",
    headerName: "Email du contact",
    flex: 1.4,
  },
  {
    field: "customerContactPhone",
    headerName: "Téléphone du contact",
    flex: 0.8,
  },
  {
    field: "collaboratorFullName",
    valueGetter: (params) => {
      return `${params.row.collaboratorFirstName || ""} ${params.row.collaboratorLastName || ""}`;
    },
    headerName: "collaborateur",
    flex: 1.5,
  },
  {
    field: "missionDescription",
    headerName: "description",
    flex: 1,
  },
];

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -13,
    top: 17,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function Missions() {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenAddModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const { data, error, isLoading } = useGetMissionsQuery();

  return (
    <>
      <AddMission open={openModal} onClose={handleCloseModal} />

      <ContentLayout>
        <ContentNavbar />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <StyledBadge badgeContent={data ? data.length : "0"} color="secondary">
            <Typography variant="h4" component="h2">
              Missions
            </Typography>
          </StyledBadge>

          <Button
            variant="contained"
            onClick={handleOpenAddModal}
            sx={{ color: "#FFFFFF" }}
            endIcon={<AddCircleOutlineOutlinedIcon />}
          >
            Ajouter une mission
          </Button>
        </Box>

        <Box sx={{ height: "90%", width: "100%", mt: 3 }}>
          {error ? (
            toast.error(
              "Oups, une erreur serveur c'est produite en essayant de récupérer les missions",
              {
                position: toast.POSITION.TOP_RIGHT,
              }
            )
          ) : isLoading ? (
            <CircularProgress />
          ) : data ? (
            <DataGrid
              rows={data}
              columns={columns}
              sx={{
                "& .MuiDataGrid-cell:hover": {
                  color: "primary.main",
                },
                fontSize: "0.7rem",
              }}
              disableRowSelectionOnClick
            />
          ) : null}
        </Box>
      </ContentLayout>
    </>
  );
}
