import { Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import ContentLayout from "components/ContentLayout";
import ContentNavbar from "components/ContentNavbar";
import EnteteDatagrid from "components/EnteteDatagrid";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetMissionsQuery } from "services/missions/missionSlice";
import AddMission from "./modals/addMission";
import CustomDataGrid from "components/CustomDataGrid";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import UpdateMission from "./modals/updateMission";
import { useGetAllClientsQuery } from "services/clients/client.api.slice";
import { useGetAllCollaboratorsQuery } from "services/collaborator/collaborator.api.slice";
import { useEffect } from "react";

export default function Missions() {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenAddModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const { data, error, isLoading } = useGetMissionsQuery();
  const [missionToUpdate, setMissionToUpdate] = useState(null);
  const [openModalMission, setOpenModalMission] = useState(false);
  const [missions, setMissions] = useState(data);
  const {
    data: Dclients,
    isError: isErrorClients,
    isLoading: isLoadingClients,
  } = useGetAllClientsQuery();
  const {
    data: Dcollaborators,
    isError: isErrorCollabs,
    isLoading: isLoadingCollabs,
  } = useGetAllCollaboratorsQuery();

  const handleOpenUpdateMission = (mission) => {
    setOpenModalMission(true);
    setMissionToUpdate(mission);
  };
  const handleCloseUpdateMission = () => {
    setOpenModalMission(false);
    setMissionToUpdate(null);
  };
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
      field: "collaboratorFullName",
      valueGetter: (params) => {
        return `${params.row.collaboratorFirstName || ""} ${params.row.collaboratorLastName || ""}`;
      },
      headerName: "Collaborateur",
      flex: 1,
    },
    {
      field: "tauxJournalier",
      headerName: "Taux Journalier",
      flex: 0.8,
    },
    {
      field: "actions",
      headerName: " ",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box sx={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
            <IconButton
              onClick={() =>
                handleOpenUpdateMission({
                  ...params.row,
                  customerId: Dclients.find(
                    (client) => client.customerName == params.row.customerName
                  ).id,
                  collaboratorId: Dcollaborators.find(
                    (collaborator) =>
                      collaborator.firstName == params.row.collaboratorFirstName &&
                      collaborator.lastName == params.row.collaboratorLastName
                  ).id,
                })
              }
            >
              <EditIcon color="action" />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  useEffect(() => {
    // Mettre à jour la liste des missions lorsque les données sont disponibles
    if (data) {
      setMissions(data);
    }
  }, [data]);
  return (
    <>
      <AddMission open={openModal} onClose={handleCloseModal} />
      <ContentLayout>
        <ContentNavbar />
        <Stack gap={2}>
          <EnteteDatagrid
            enteteText={"Missions"}
            ctaButtonOnClick={handleOpenAddModal}
            ctaButtonText={"Ajouter Une Mission"}
            totalCount={missions ? missions?.length : null}
          />
          {error ? (
            toast.error(
              "Oups, une erreur serveur c'est produite en essayant de récupérer les missions",
              {
                position: toast.POSITION.TOP_RIGHT,
              }
            )
          ) : isLoading ? (
            <CircularProgress />
          ) : missions ? (
            <CustomDataGrid columns={columns} rows={missions} />
          ) : null}
        </Stack>
        {missionToUpdate && (
          <UpdateMission
            mission={missionToUpdate}
            isOpen={openModalMission}
            handleClose={handleCloseUpdateMission}
            setMissionToUpdate={setMissionToUpdate}
            existingMissions={missions}
            Dclients={Dclients}
            Dcollaborators={Dcollaborators}
            setMissions={setMissions}
          ></UpdateMission>
        )}
      </ContentLayout>
    </>
  );
}
