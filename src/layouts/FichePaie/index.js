import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Snackbar,
  Typography,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import colors from "assets/theme/base/colors";
import ContentLayout from "components/ContentLayout";
import ContentNavbar from "components/ContentNavbar";
import { format } from "date-fns";
import fr from "date-fns/locale/fr";
import { DropzoneArea } from "material-ui-dropzone";
import { useState } from "react";
import { useGetAllCollaboratorsQuery } from "../../services/collaborator/collaborator.api.slice";
import { useAffectFichePaieMutation } from "../../services/fichePaie/fichePaie.api.slice";
const { info } = colors;

const styles = {
  root: {
    background: "red",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    display: "flex",
    mt: 2,
    mb: 4,
    "& .MuiTextField-root": {
      width: "45%",
    },
  },
  button: {
    width: "20%",
    color: "white !important",
    height: "auto",
    backgroundColor: info.main,
    "&:hover": {
      backgroundColor: info.main,
    },
  },
  item: {
    display: "block",
    margin: 4,
    padding: 4,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    "& #submitButton": {
      backgroundColor: info.main,
    },
  },
  dropzoneArea: {
    justifyContent: "center",
    display: "flex",
    marginBottom: "2rem",
    "& .MuiDropzoneArea-root": {
      backgroundColor: "#ddd",
      width: "70% !important",
      minHeight: "200px",
      "& .MuiGrid-container": {
        justifyContent: "center",
      },
    },
  },
};

function FichePaie() {
  const [date, setDate] = useState();
  const [selectedCollab, setSelectedCollab] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const {
    data: allCollaborators,
    error: collaboratorsError,
    isLoading: loadingCollaborators,
  } = useGetAllCollaboratorsQuery();

  const [affectFichePaie] = useAffectFichePaieMutation();

  const Loading = <Typography variant="body2">Chargement ...</Typography>;
  const Error = <Typography variant="body2">Erreur !</Typography>;
  const Empty = <Typography variant="body2">Aucun élément n{"\u2019"}est trouvé</Typography>;

  const renderNames = () => {
    if (loadingCollaborators) return Loading;
    if (collaboratorsError) return Error;
    if (!allCollaborators?.length) return Empty;

    return allCollaborators?.map((item, idx) => {
      return (
        <MenuItem key={idx} value={item} style={styles.item}>
          {item.firstName + " " + item.lastName}
        </MenuItem>
      );
    });
  };

  const renderSelectedCollab = () => (
    <Typography variant="body2" sx={{ fontWeight: "400" }}>
      {selectedCollab?.firstName + " " + selectedCollab?.lastName}
    </Typography>
  );

  const handleChangeFile = (file) => {
    if (file.length) {
      setSelectedFile(file[0]);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("collaborator", selectedCollab.id);
    formData.append("monthYear", format(date, "MM/yyyy"));
    try {
      const response = await affectFichePaie(formData);
      if (response.error) setError(response.error.message);
      else {
        setSuccess("Fiche de paie affectée avec succès");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <ContentLayout>
      <ContentNavbar />
      <Box sx={styles.header} direction={{ xs: "column", sm: "row" }}>
        <FormControl sx={{ width: "50%" }}>
          <InputLabel>Nom et prénom</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
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

        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
          <DatePicker
            label="Mois"
            value={date}
            onChange={(value) => setDate(value)}
            views={["month", "year"]}
          />
        </LocalizationProvider>
      </Box>

      <Box sx={styles.dropzoneArea}>
        <DropzoneArea
          acceptedFiles={["application/pdf"]}
          dropzoneText={"Faites glisser et déposez un fichier ici ou cliquez"}
          onChange={handleChangeFile}
          onDelete={() => {
            setSelectedFile();
          }}
          filesLimit={1}
          showFileNames={true}
          showAlerts={false}
        />
      </Box>
      <Box sx={styles.buttonContainer}>
        <Button
          id="submitButton"
          variant="contained"
          sx={styles.button}
          disabled={!selectedCollab || !date || !selectedFile}
          onClick={handleSubmit}
        >
          Uploader
        </Button>
      </Box>
      <Snackbar
        open={error}
        autoHideDuration={5000}
        onClose={() => setError()}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert variant="filled" severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
      <Snackbar
        open={success}
        autoHideDuration={5000}
        onClose={() => setSuccess()}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
          {success}
        </Alert>
      </Snackbar>
    </ContentLayout>
  );
}

export default FichePaie;
