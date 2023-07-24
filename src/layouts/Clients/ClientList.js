import { Badge, Box, CircularProgress, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetAllClientsQuery } from "services/clients/client.api.slice";
import NewClient from "./NewClient";

const ClientList = () => {
  const { data: data, isLoading, isError } = useGetAllClientsQuery();

  const columns = [
    { field: "id", headerName: "Id", flex: 0.5 },
    { field: "customerEmail", headerName: "Email", flex: 1 },
    { field: "customerName", headerName: "Nom", flex: 1 },
    { field: "customerAddress", headerName: "Adresse", flex: 2 },
    { field: "customerPhone", headerName: "N° Telephone", flex: 1 },
    { field: "customerTvaNumber", headerName: "N° TVA", flex: 1 },
  ];

  return (
    <div>
      <Stack gap={2}>
        <Stack>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Badge badgeContent={data ? data.customers.length : "0"} color="secondary">
              <Typography variant="h4" component="h2">
                Clients
              </Typography>
            </Badge>
            <NewClient />
          </Box>
        </Stack>
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
            <DataGrid
              rows={data.customers}
              columns={columns}
              initialState={{
                pagination: {
                  sorting: {
                    sortModel: [{ field: "id", sort: "desc" }],
                  },
                  paginationModel: { pageSize: 15 },
                },
              }}
              pageSizeOptions={[5, 10, 15, 50, 100]}
            />
          ) : null}
        </Stack>
      </Stack>
    </div>
  );
};

export default ClientList;
