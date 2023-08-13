import EditIcon from "@mui/icons-material/Edit";
import { Box, CircularProgress, IconButton, Stack } from "@mui/material";
import CustomDataGrid from "components/CustomDataGrid";
import EnteteDatagrid from "components/EnteteDatagrid";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetAllClientsQuery } from "services/clients/client.api.slice";
import { initData, togglePopup, toggleUpdatePopup } from "services/clients/client.slice";
import NewClientPopup from "./NewClient";
import UpdateClientPopup from "./UpdateClient";

const ClientList = () => {
  const { data: data, isLoading, isError } = useGetAllClientsQuery();
  const dispatch = useDispatch();
  const [row, setRow] = useState();

  const columns = [
    { field: "id", headerName: "Id", flex: 0.5 },
    { field: "customerEmail", headerName: "Email", flex: 1 },
    { field: "customerName", headerName: "Nom", flex: 1 },
    { field: "customerAddress", headerName: "Adresse", flex: 2 },
    { field: "customerPhone", headerName: "N° Telephone", flex: 1 },
    { field: "customerTvaNumber", headerName: "N° TVA", flex: 1 },
    {
      field: "actions",
      headerName: " ",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box sx={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
            <IconButton onClick={() => handleOpenUpdateCustomer(params.row)}>
              <EditIcon color="action" />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  const handleOpen = () => {
    dispatch(togglePopup());
  };

  const handleOpenUpdateCustomer = (data) => {
    dispatch(initData(data));
    dispatch(toggleUpdatePopup(true));
    setRow(data);
  };

  return (
    <div>
      <NewClientPopup />
      <UpdateClientPopup row={row} />
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
              "Oups, une erreur serveur c'est produite en essayant de récupérer les clients",
              {
                position: toast.POSITION.TOP_RIGHT,
              }
            )
          ) : isLoading ? (
            <CircularProgress />
          ) : data ? (
            <CustomDataGrid rows={data} columns={columns} />
          ) : null}
        </Stack>
      </Stack>
    </div>
  );
};

export default ClientList;
