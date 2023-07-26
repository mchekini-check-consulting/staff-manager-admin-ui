import ContentLayout from "components/ContentLayout";
import ContentNavbar from "components/ContentNavbar";
import { useState, useEffect, useRef } from "react";
import {
  Box,
  OutlinedInput,
  MenuItem,
  Select,
  Stack,
  Chip,
  InputLabel,
  FormControl,
  Button,
  Checkbox,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CancelIcon from "@mui/icons-material/Cancel";
import { DOC_TYPES } from "constants/documentTypes";
import { useSearchDocumentsMutation } from "../../services/justificatifs/justificatif.api.slice";
import Loader from "components/Loader";

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
    field: "collaborator",
    headerName: "Nom et Prenom",
    width: 200,
  },
  {
    field: "type",
    valueGetter: (params) => {
      let type = DOC_TYPES.find((e, i) => params.value == e.value);
      return type.label;
    },
    headerName: "Type de justificatif ",
    width: 200,
  },
  {
    field: "name",
    headerName: "Nom du document",
    width: 180,
  },
  {
    field: "createdAt",
    headerName: "Date d'ajout du document",
    width: 180,
  },
];

const collaborators = [
  {
    id: 1,
    name: "amine amine",
  },
  {
    id: 2,
    name: "Anis Anis",
  },
  {
    id: 3,
    name: "Aymen Aymen",
  },
];

function Justificatif() {
  const [selectedNames, setSelectedNames] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [columnWidth, setColumnWidth] = useState();
  const boxRef = useRef(null);

  const [searchDocuments, { data, error, isLoading }] = useSearchDocumentsMutation();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (boxRef.current) {
      const parentWidth = boxRef.current.clientWidth;
      const cellWidth = parentWidth / columns.length;
      setColumnWidth(cellWidth);
    }
  }, [boxRef]);

  const getData = () => {
    let data = {
      collaborators: [...selectedNames?.map((e, i) => e.id)],
      types: [...selectedTypes?.map((e, i) => e.value)],
    };
    searchDocuments(data);
  };

  const renderSelectedNames = (selected) => (
    <Stack gap={1} direction="row" flexWrap="nowrap" overflow="auto">
      {selected.map((value) => (
        <Chip
          key={value.id}
          label={value.name}
          onDelete={() => {
            setSelectedNames(selectedNames.filter((item) => item.id !== value.id));
          }}
          deleteIcon={<CancelIcon onMouseDown={(event) => event.stopPropagation()} />}
        />
      ))}
    </Stack>
  );

  const renderSelectedTypes = (selected) => (
    <Stack gap={1} direction="row" flexWrap="nowrap" overflow={"auto"}>
      {selected.map((value, index) => (
        <Chip
          key={index}
          label={value.label}
          onDelete={() => {
            setSelectedTypes(selectedTypes.filter((item) => item.value !== value.value));
          }}
          deleteIcon={<CancelIcon onMouseDown={(event) => event.stopPropagation()} />}
        />
      ))}
    </Stack>
  );

  const renderTypes = () => {
    return DOC_TYPES.map((item) => {
      let checked = selectedTypes.some((selectedItem) => item.value === selectedItem.value);
      return (
        <MenuItem key={item.id} value={item}>
          <Checkbox
            checked={checked}
            onChange={() => {
              if (checked) {
                setSelectedTypes(
                  selectedTypes.filter((selectedItem) => item.value !== selectedItem.value)
                );
              } else {
                setSelectedTypes([...selectedTypes, item]);
              }
            }}
          />
          {item.label}
        </MenuItem>
      );
    });
  };

  const renderNames = () => {
    return collaborators.map((item) => {
      let checked = selectedNames.some((selectedItem) => selectedItem.id === item.id);
      return (
        <MenuItem key={item.id} value={item}>
          <Checkbox
            checked={checked}
            onChange={() => {
              if (checked) {
                setSelectedNames(
                  selectedNames.filter((selectedItem) => selectedItem.id !== item.id)
                );
              } else {
                setSelectedNames([...selectedNames, item]);
              }
            }}
          />
          {item.name}
        </MenuItem>
      );
    });
  };

  return (
    <ContentLayout>
      <ContentNavbar />
      <Box ref={boxRef} sx={styles.header} direction={{ xs: "column", sm: "row" }}>
        <FormControl sx={{ width: "40%" }}>
          <InputLabel>Nom et prenom</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            sx={styles.select}
            multiple
            value={selectedNames}
            onChange={(e) => setSelectedNames(e.target.value)}
            input={<OutlinedInput label="Nom et prenom" disableOutline />}
            renderValue={renderSelectedNames}
            MenuProps={{
              autoFocus: false,
              PaperProps: {
                style: {
                  maxHeight: 230,
                },
              },
            }}
          >
            {renderNames()}
          </Select>
        </FormControl>

        <FormControl sx={{ width: "40%" }}>
          <InputLabel>Type de justificatif</InputLabel>
          <Select
            sx={styles.select}
            multiple
            value={selectedTypes}
            onChange={(e) => setSelectedTypes(e.target.value)}
            input={<OutlinedInput label="Type de justificatif" disableOutline />}
            renderValue={renderSelectedTypes}
            MenuProps={{
              autoFocus: false,
              PaperProps: {
                style: {
                  maxHeight: 230,
                },
              },
            }}
          >
            {renderTypes()}
          </Select>
        </FormControl>

        <Button variant="contained" sx={styles.button} onClick={getData}>
          Appliquer
        </Button>
      </Box>

      <Box sx={{ height: "90%", width: "100%" }}>
        {error ? (
          <Typography variant="body1" sx={{ color: "red" }}>
            Erreur ! Veuillex reesayer plus tard
          </Typography>
        ) : isLoading ? (
          <Box style={styles.spinner}>
            <Loader />
          </Box>
        ) : !data || data.length === 0 ? (
          <Typography variant="body1" sx={{ color: "red" }}>
            Aucun document n{"\u2019"}est trouvé.
          </Typography>
        ) : (
          <DataGrid
            rows={data}
            columns={columns.map((col) => ({ ...col, width: columnWidth - 5 }))}
            sx={{
              "& .MuiDataGrid-cell:hover": {
                color: "primary.main",
                cursor: "pointer",
              },
            }}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 6 },
              },
            }}
            pageSizeOptions={[6, 15, 30, 100]}
            disableRowSelectionOnClick
          />
        )}
      </Box>
    </ContentLayout>
  );
}

export default Justificatif;
