/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
// eslint-disable-next-line react/jsx-key
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import ContentLayout from "components/ContentLayout";
import ContentNavbar from "components/ContentNavbar";
import CustomDataGrid from "components/CustomDataGrid";
import Loader from "components/Loader";
import { useEffect, useRef, useState } from "react";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { useGetAllClientsQuery } from "../../services/clients/client.api.slice";
import { useGetAllCollaboratorsQuery } from "../../services/collaborator/collaborator.api.slice";
import { useSearchInvoicesMutation } from "../../services/invoice/invoice.api.slice";
import FactureAction from "../../components/FactureAction";

const styles = {
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    display: "flex",
    mt: 2,
    mb: 4,
  },
  button: {
    width: "15%",
    color: "white !important",
    height: "auto",
  },
  select: {
    "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
      height: "0.5rem",
    },
    "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
      backgroundColor: "#cccccc",
      borderRadius: 4,
    },
    "& .MuiButtonBase-root": {
      margin: "4px",
    },
    "& .css-w6oznf-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select": {
      height: "2rem",
      paddingRight: "12px",
    },
  },
  spinner: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
};

const columns = [
  {
    field: "name",
    headerName: "Nom Facture",
    width: 150,
  },
  {
    field: "collabName",
    headerName: "Collaborateurs",
    width: 150,
  },
  {
    field: "customer",
    headerName: "Clients",
    width: 150,
  },

  {
    field: "date",
    headerName: "Date",
    width: 150,
  },
  {
    field: "actions",
    headerName: " ",
    width: 180,
    renderCell: (params) => <FactureAction {...{ params }} />,
  },
];

const Loading = <Typography variant="body1">Chargement ...</Typography>;
const Error = <Typography variant="body1">Erreur !</Typography>;
const Empty = <Typography variant="body1">Aucun élément n{"\u2019"}est trouvé</Typography>;

function Facture() {
  const [selectedCollabs, setSelectedCollabs] = useState([]);
  const [selectedClients, setSelectedClients] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);

  const [columnWidth, setColumnWidth] = useState();
  const boxRef = useRef(null);

  const [searchInvoices, { data: invoicesData, error: invoiceError, isLoading: invoiceLoading }] =
    useSearchInvoicesMutation();
  const {
    data: collabs,
    error: collaboratorsError,
    isLoading: loadingCollaborators,
  } = useGetAllCollaboratorsQuery();

  const { data: clients, error: clientsError, isLoading: clientsLoading } = useGetAllClientsQuery();

  const fixInvoices = (data) => {
    return data?.map((item) => {
      return {
        id: item.id,
        name: item.name,
        customer: item.customer,
        collabName: item.collaboratorFirstName + " " + item.collaboratorLastName,
        date: item.date,
      };
    });
  };

  useEffect(() => {
    onSearch();
  }, []);

  useEffect(() => {
    if (boxRef.current) {
      const parentWidth = boxRef.current.clientWidth;
      const cellWidth = parentWidth / columns.length;
      setColumnWidth(cellWidth);
    }
  }, [boxRef]);

  const onSearch = () => {
    let filters = {
      collaborators: [...selectedCollabs?.map((c) => c.id)],
      clients: [...selectedClients?.map((c) => c.id)],
      dates: [...selectedDates?.map((d) => d.format())],
    };
    searchInvoices(filters);
  };

  const renderSelectedCollabs = (selected) => (
    <Stack gap={1} direction="row" flexWrap="nowrap" overflow="auto">
      {selected.map((value) => (
        <Chip
          key={value.id}
          label={value.firstName + " " + value.lastName}
          onDelete={() => {
            setSelectedCollabs(selectedCollabs.filter((item) => item.id !== value.id));
          }}
          deleteIcon={<CancelIcon onMouseDown={(event) => event.stopPropagation()} />}
        />
      ))}
    </Stack>
  );
  const renderSelectedClients = (selected) => (
    <Stack gap={1} direction="row" flexWrap="nowrap" overflow="auto">
      {selected.map((value) => (
        <Chip
          key={value.id}
          label={value.customerName}
          onDelete={() => {
            setSelectedClients(selectedClients.filter((item) => item.id !== value.id));
          }}
          deleteIcon={<CancelIcon onMouseDown={(event) => event.stopPropagation()} />}
        />
      ))}
    </Stack>
  );

  const renderCollabs = () => {
    if (loadingCollaborators) return Loading;
    if (collaboratorsError) return Error;
    if (!collabs.length) return Empty;

    return (
      collabs &&
      collabs?.map((item) => {
        let checked = selectedCollabs.some((selectedItem) => selectedItem.id === item.id);
        return (
          <MenuItem key={item.id} value={item}>
            <Checkbox
              checked={checked}
              onChange={() => {
                if (checked) {
                  setSelectedCollabs(
                    selectedCollabs.filter((selectedItem) => selectedItem.id !== item.id)
                  );
                } else {
                  setSelectedCollabs([...selectedCollabs, item]);
                }
              }}
            />
            {item.firstName + " " + item.lastName}
          </MenuItem>
        );
      })
    );
  };
  const renderClients = () => {
    if (clientsLoading) return Loading;
    if (clientsError) return Error;
    if (!clients.length) return Empty;

    return (
      clients &&
      clients?.map((item) => {
        let checked = selectedClients.some((selectedItem) => selectedItem.id === item.id);
        return (
          <MenuItem key={item.id} value={item}>
            <Checkbox
              checked={checked}
              onChange={() => {
                if (checked) {
                  setSelectedClients(
                    selectedClients.filter((selectedItem) => selectedItem.id !== item.id)
                  );
                } else {
                  setSelectedClients([...selectedClients, item]);
                }
              }}
            />
            {item.customerName}
          </MenuItem>
        );
      })
    );
  };

  return (
    <ContentLayout>
      <ContentNavbar />
      <Box ref={boxRef} sx={styles.header} direction={{ xs: "column", sm: "row" }}>
        <FormControl sx={{ width: "25%" }}>
          <InputLabel>Collaborateurs</InputLabel>
          <Select
            labelId="multiple-collabs"
            id="multiple-collabs"
            sx={styles.select}
            multiple
            value={selectedCollabs}
            onChange={(e) => setSelectedCollabs(e.target.value)}
            input={<OutlinedInput label="Nom et prenom" disableOutline={true} />}
            renderValue={renderSelectedCollabs}
            MenuProps={{
              autoFocus: false,
              PaperProps: {
                style: {
                  maxHeight: 230,
                },
              },
            }}
          >
            {renderCollabs()}
          </Select>
        </FormControl>

        <FormControl sx={{ width: "25%" }}>
          <InputLabel>Clients</InputLabel>
          <Select
            labelId="multiple-clients"
            id="multiple-clients"
            sx={styles.select}
            multiple
            value={selectedClients}
            onChange={(e) => setSelectedClients(e.target.value)}
            input={<OutlinedInput label="Nom et prenom" disableOutline />}
            renderValue={renderSelectedClients}
            MenuProps={{
              autoFocus: false,
              PaperProps: {
                style: {
                  maxHeight: 230,
                },
              },
            }}
          >
            {renderClients()}
          </Select>
        </FormControl>

        <DatePicker
          value={selectedDates}
          onChange={setSelectedDates}
          multiple
          sort
          format="MM/YYYY"
          calendarPosition="bottom-center"
          onlyMonthPicker
          inputClass="datepicker-input"
          placeholder="Date"
          plugins={[<DatePanel />]}
        />

        <Button variant="contained" sx={styles.button} onClick={onSearch}>
          Appliquer
        </Button>
      </Box>

      <Box sx={{ height: "90%", width: "100%" }}>
        {invoiceError ? (
          <Typography variant="body1" sx={{ color: "red" }}>
            Erreur ! Veuillez réesayer plus tard
          </Typography>
        ) : invoiceLoading ? (
          <Box style={styles.spinner}>
            <Loader />
          </Box>
        ) : !invoicesData || invoicesData?.length === 0 ? (
          <Typography variant="body1" sx={{ color: "black" }}>
            Aucune facture disponible
          </Typography>
        ) : (
          <CustomDataGrid
            columns={columns.map((col) => ({ ...col, width: columnWidth - 5 }))}
            rows={fixInvoices(invoicesData)}
          />
        )}
      </Box>
    </ContentLayout>
  );
}

export default Facture;
