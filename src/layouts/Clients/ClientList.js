import { CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetAllClientsQuery } from "services/clients/client.api.slice";

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

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return toast.error(
      "Oups, une erreur serveur c'est produite en essayant de récupérer les clients",
      {
        position: toast.POSITION.TOP_RIGHT,
      }
    );
  }

  if (data) {
    return (
      <div>
        <DataGrid
          rows={data.customers}
          columns={columns}
          initialState={{
            pagination: {
              sortModel: [{ field: "id", sort: "desc" }],
              paginationModel: { pageSize: 6 },
            },
          }}
          pageSizeOptions={[6, 15, 30, 100]}
        />
      </div>
    );
  }
  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return toast.error(
      "Oups, une erreur serveur c'est produite en essayant de récupérer les clients",
      {
        position: toast.POSITION.TOP_RIGHT,
      }
    );
  }

  if (data) {
    return (
      <div>
        <DataGrid
          rows={data.customers}
          columns={columns}
          initialState={{
            pagination: {
              sortModel: [{ field: "id", sort: "desc" }],
              paginationModel: { pageSize: 6 },
            },
          }}
          pageSizeOptions={[6, 15, 30, 100]}
        />
      </div>
    );
  }
};

export default ClientList;
