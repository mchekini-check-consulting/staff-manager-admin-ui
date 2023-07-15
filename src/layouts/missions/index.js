import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Badge, Box, Button } from "@mui/material";
import ContentLayout from "components/ContentLayout";
import ContentNavbar from "components/ContentNavbar";
import Typography from "components/MD/MDTypography";
import AddMission from "./modals/addMission";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";

const columns = [
  { field: "name", headerName: "Nom de la mission", width: 150 },
  {
    field: "startingDateMission",
    headerName: "Date de début ",
    width: 150,
  },
  {
    field: "endingDateMission",
    headerName: "Date de fin ",
    width: 150,
  },
  {
    field: "customer",
    headerName: "Client",
    width: 100,
  },
  {
    field: "customerContactFirstname",
    headerName: "Nom du Contact",
    width: 160,
  },
  {
    field: "customerContactLastname",
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
];

const rows = [
  {
    id: 1,
    name: "mission name",
    startingDateMission: "11-11-2011",
    endingDateMission: "11-11-2011",
    customer: "AMAZON",
    customerContactFirstname: "John",
    customerContactLastname: "Doe",
    customerContactEmail: "john@gmail.com",
    customerContactPhone: "0203029382",
    collaborator: "Jerry ",
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

  return (
    <>
      <AddMission open={openModal} onClose={handleCloseModal} />

      <ContentLayout>
        <ContentNavbar />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <StyledBadge badgeContent={rows.length} color="secondary">
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
            rows={rows}
            columns={columns}
            sx={{
              "& .MuiDataGrid-cell:hover": {
                color: "primary.main",
              },
            }}
            disableRowSelectionOnClick
          />
        </Box>
      </ContentLayout>
    </>
  );
}
