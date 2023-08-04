import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ContentLayout from "components/ContentLayout";
import ContentNavbar from "components/ContentNavbar";
import { format } from "date-fns";
import fr from "date-fns/locale/fr";
import { useEffect, useRef, useState } from "react";
import { useGetAllCollaboratorsQuery } from "../../services/collaborator/collaborator.api.slice";
import { useAffectFichePaieMutation } from "../../services/fichePaie/fichePaie.api.slice";

const styles = {
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    display: "flex",
    mt: 2,
    mb: 4,
  },
  filebutton: {
    width: "50%",
    padding: 5,
    borderStyle: "dashed",
    borderWidth: 2,
    color: "black !important",
    marginBottom: 2,
    marginLeft: "25%",
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
  date: {
    "& .css-84ldin-MuiPickersMonth-monthButton ": {
      fontSize: "0.9rem !important",
      backgroundColor: "red",
    },
  },
};

function FichePaie() {
  const [date, setDate] = useState();
  const [selectedCollab, setSelectedCollab] = useState();
  const [collaborators, setCollaborators] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const boxRef = useRef(null);

  const {
    data: allCollaborators,
    error: collaboratorsError,
    isLoading: loadingCollaborators,
  } = useGetAllCollaboratorsQuery();

  const [affectFichePaie] = useAffectFichePaieMutation();

  const Loading = <Typography variant="body1">Chargement ...</Typography>;
  const Error = <Typography variant="body1">Erreur !</Typography>;
  const Empty = <Typography variant="body1">Aucun élément n{"\u2019"}est trouvé</Typography>;

  useEffect(() => {
    if (allCollaborators) setCollaborators(allCollaborators);
    if (selectedCollab && !collaborators.includes(selectedCollab)) {
      setSelectedCollab({});
    }
  }, [allCollaborators]);

  const renderNames = () => {
    if (loadingCollaborators) return Loading;
    if (collaboratorsError) return Error;
    if (!collaborators.length) return Empty;

    return collaborators?.map((item, idx) => {
      return (
        <MenuItem key={idx} value={item}>
          {item.firstName + " " + item.lastName}
        </MenuItem>
      );
    });
  };

  const renderSelectedCollab = () => (
    <Chip
      key={selectedCollab?.id}
      label={selectedCollab?.firstName + " " + selectedCollab?.lastName}
    />
  );

  const handleChangeFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = () => {
    const request = {
      collaborator: selectedCollab.id,
      monthYear: format(date, "MM/yyyy"),
      file: selectedFile,
    };
    console.log("file", request);
    affectFichePaie(request);
  };

  return (
    <ContentLayout>
      <ContentNavbar />
      <Box ref={boxRef} sx={styles.header} direction={{ xs: "column", sm: "row" }}>
        <FormControl sx={{ width: "50%" }}>
          <InputLabel>Nom et prénom</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            sx={styles.select}
            value={selectedCollab}
            onChange={(e) => {
              setSelectedCollab(e.target.value);
            }}
            input={<OutlinedInput label="Nom et prenom" disableOutline />}
            renderValue={renderSelectedCollab}
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

        <LocalizationProvider sx={{ width: "45%" }} dateAdapter={AdapterDateFns} adapterLocale={fr}>
          <DatePicker
            label="Mois"
            value={date}
            onChange={(value) => setDate(value)}
            views={["month", "year"]}
            sx={styles.date}
          />
        </LocalizationProvider>
      </Box>

      <Box>
        <Button variant="outlined" component="label" sx={styles.filebutton}>
          {selectedFile ? selectedFile.name : "Joindre un fichier"}
          <input hidden accept="application/pdf" multiple type="file" onChange={handleChangeFile} />
        </Button>
      </Box>
      <Box
        sx={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Button
          variant="contained"
          sx={styles.button}
          disabled={!selectedCollab || !date || !selectedFile}
          onClick={handleSubmit}
        >
          Valider
        </Button>
      </Box>
    </ContentLayout>
  );
}

export default FichePaie;
