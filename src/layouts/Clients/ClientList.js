import { DataGrid } from "@mui/x-data-grid";
import { fakerFR as faker } from "@faker-js/faker";
import { useEffect, useState } from "react";

const ClientList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const rows = [];

    for (let i = 1; i <= 50; i++) {
      const row = {
        id: i,
        email: faker.internet.email(),
        nom: faker.person.fullName(),
        adresse:
          faker.location.city() +
          ", " +
          faker.location.street() +
          ", " +
          faker.location.buildingNumber(),
        telephone: faker.phone.number(),
        tva: faker.number.int({ min: 5, max: 20 }),
      };

      rows.push(row);
    }

    setData(rows);
  }, []);

  const columns = [
    { field: "id", headerName: "Id", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "nom", headerName: "Nom", flex: 1 },
    { field: "adresse", headerName: "Adresse", flex: 2 },
    { field: "telephone", headerName: "N° Telephone", flex: 1 },
    { field: "tva", headerName: "N° TVA", flex: 1 },
  ];

  return (
    <div>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 6 },
          },
        }}
        pageSizeOptions={[6, 15, 30, 100]}
      />
    </div>
  );
};

export default ClientList;
