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
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CancelIcon from "@mui/icons-material/Cancel";
import { DOC_TYPES } from "constants/documentTypes";

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
};

const columns = [
  {
    field: "name",
    headerName: "Nom et Prenom",
    width: 200,
  },
  {
    field: "documentType",
    headerName: "Type de justificatif ",
    width: 200,
  },
  {
    field: "documentName",
    headerName: "Nom du document",
    width: 180,
  },
  {
    field: "documentCreationDate",
    headerName: "Date d'ajout du document",
    width: 180,
  },
];

function Justificatif() {
  const [names, setNames] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [columnWidth, setColumnWidth] = useState();
  const [errors, setErrors] = useState([]);
  const boxRef = useRef(null);

  useEffect(() => {
    fetch("./mockedData/collaboratorsList.json")
      .then((response) => response.json())
      .then((data) => {
        setNames(data);
      })
      .catch((err) => {
        setErrors([...errors, { type: "getCollaborators", message: err }]);
      });
  }, []);

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
    fetch("./mockedData/documentsList.json")
      .then((response) => response.json())
      .then((data) => setDocuments(data))
      .catch((err) => {
        setErrors([...errors, { type: "getDocuments", message: err }]);
      });
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
            {names.map((item) => (
              <MenuItem key={item.id} value={item}>
                <Checkbox
                  checked={selectedNames.some((selectedItem) => selectedItem.id === item.id)}
                  onChange={() => {
                    if (selectedNames.some((selectedItem) => selectedItem.id === item.id)) {
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
            ))}
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
            {DOC_TYPES.map((item, i) => (
              <MenuItem key={i} value={item}>
                <Checkbox
                  checked={selectedTypes.some((selectedItem) => item.value === selectedItem.value)}
                  onChange={() => {
                    if (selectedTypes.some((selectedItem) => item.value === selectedItem.value)) {
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
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" sx={styles.button} onClick={getData}>
          Appliquer
        </Button>
      </Box>

      <Box sx={{ height: "90%", width: "100%" }}>
        <DataGrid
          rows={documents}
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
      </Box>
    </ContentLayout>
  );
}

export default Justificatif;
