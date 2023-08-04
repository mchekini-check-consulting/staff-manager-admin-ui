import React from "react";
import { DataGrid, GridToolbar, frFR } from "@mui/x-data-grid";

/**
 * Ce composant est le datagrid a utiliser dans toutte l'application
 * On va centraliser tout les defaults ici : ( Pagination, sorting, localization, parametres par default ...)
 * De plus, si on veut changer le datagrid dans le futur, on le fait uniquement ici.
 * @param {*} props
 * @returns Un datagrid
 */
const CustomDataGrid = (props) => {
  return (
    <DataGrid
      sx={{
        "& .MuiDataGrid-cell:hover": {
          color: "primary.main",
          cursor: "pointer",
        },
      }}
      initialState={{
        pagination: {
          sorting: {
            sortModel: [{ field: "id", sort: "desc" }], // sort by id par default
          },
          paginationModel: { pageSize: 10 }, // default page size ( must exist in pageSizeOptions, sinon : warning dans la console )
        },
      }}
      slots={{
        toolbar: GridToolbar, // sa ajoute 4 bouttons en haut du Datagrid : exporter en CSV/imprimer, densité, filtres et hide columns
      }}
      localeText={frFR.components.MuiDataGrid.defaultProps.localeText} // traduction en Français ( bouttons , textes, text pagination ... tout - on peut changer sa )
      pageSizeOptions={[10, 25, 50, 100]}
      disableRowSelectionOnClick
      {...props} // toutte config propre a votre cas ( columns, rows, isLoading ... ou autre ) va override cette config default
    />
  );
};

export default CustomDataGrid;
