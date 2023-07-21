import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Badge, Box, Button } from "@mui/material";
import ContentLayout from "components/ContentLayout";
import ContentNavbar from "components/ContentNavbar";
import Typography from "components/MD/MDTypography";
import AddMission from "./modals/addMission";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const columns = [
  { field: "missionName", headerName: "Nom de la mission", width: 150 },
  {
    field: "startingDate",
    headerName: "Date de début ",
    width: 150,
  },
  {
    field: "endingDate",
    headerName: "Date de fin ",
    width: 150,
  },
  {
    field: "customerName",
    headerName: "Client",
    width: 100,
  },
  {
    field: "customerContactFirstName",
    headerName: "Nom du Contact",
    width: 160,
  },
  {
    field: "customerContactLastName",
    headerName: "Prénom du Contact",
    width: 160,
  },
  {
    field: "customerContactEmail",
    headerName: "Email du contact",
    width: 160,
  },
  {
    field: "customerContactPhone",
    headerName: "Téléphone du contact",
    width: 160,
  },
  {
    field: "collaborator",
    headerName: "Affectation",
    width: 160,
  },
  {
    field: "MissionDescription",
    headerName: "description",
    width: 160,
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
  const [missions, setMission] = useState([]);

  const handleOpenAddModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    //replace with this when api endpoint is available
    //http://check-consulting.net:8080/api/v1/mission
    fetch("./api_mocks/missionsMock.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => setMission(result))
      .catch((error) => {
        toast.error(
          "Oups, une erreur serveur c'est produite en essayant de récupérer les missions",
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
      });
  });

  return (
    <>
      <AddMission open={openModal} onClose={handleCloseModal} />

      <ContentLayout>
        <ContentNavbar />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <StyledBadge badgeContent={missions.length} color="secondary">
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
          <DataGrid
            rows={missions}
            columns={columns}
            sx={{
              "& .MuiDataGrid-cell:hover": {
                color: "primary.main",
              },
            }}
            disableRowSelectionOnClick
          />
        </Box>
        <ToastContainer />
      </ContentLayout>
    </>
  );
}
