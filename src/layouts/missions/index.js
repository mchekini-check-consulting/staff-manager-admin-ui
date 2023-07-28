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
];

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
        <Stack gap={2}>
          <EnteteDatagrid
            enteteText={"Missions"}
            ctaButtonOnClick={handleOpenAddModal}
            ctaButtonText={"Ajouter Une Mission"}
            totalCount={data ? data?.length : null}
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
          ) : data ? (
            <CustomDataGrid columns={columns} rows={data} />
          ) : null}
        </Stack>
      </ContentLayout>
    </>
  );
}
