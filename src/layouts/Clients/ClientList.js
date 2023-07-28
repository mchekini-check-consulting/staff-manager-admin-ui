import { Badge, Box, CircularProgress, Stack, Typography } from "@mui/material";
import CustomDataGrid from "components/CustomDataGrid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetAllClientsQuery } from "services/clients/client.api.slice";
import EnteteDatagrid from "components/EnteteDatagrid";
import { useDispatch } from "react-redux";
import { togglePopup } from "services/clients/client.slice";
import NewClientPopup from "./NewClient";

const ClientList = () => {
  const { data: data, isLoading, isError } = useGetAllClientsQuery();
  const dispatch = useDispatch();

  const columns = [
    { field: "id", headerName: "Id", flex: 0.5 },
    { field: "customerEmail", headerName: "Email", flex: 1 },
    { field: "customerName", headerName: "Nom", flex: 1 },
    { field: "customerAddress", headerName: "Adresse", flex: 2 },
    { field: "customerPhone", headerName: "N° Telephone", flex: 1 },
    { field: "customerTvaNumber", headerName: "N° TVA", flex: 1 },
  ];

  const handleOpen = () => {
    dispatch(togglePopup());
  };

  return (
    <div>
      <NewClientPopup />
      <Stack gap={2}>
        <EnteteDatagrid
          enteteText={"Clients"}
          ctaButtonOnClick={handleOpen}
          ctaButtonText={"Ajouter Un Client"}
          totalCount={data ? data?.customers?.length : null}
        />
        <Stack>
          {isError ? (
            toast.error(
              "Oups, une erreur serveur c'est produite en essayant de récupérer les missions",
              {
                position: toast.POSITION.TOP_RIGHT,
              }
            )
          ) : isLoading ? (
            <CircularProgress />
          ) : data ? (
            <CustomDataGrid rows={data.customers} columns={columns} />
          ) : null}
        </Stack>
      </Stack>
    </div>
  );
};

export default ClientList;
