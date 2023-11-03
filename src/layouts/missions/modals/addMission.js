import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import { Alert, Button, Snackbar, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import enGB from "date-fns/locale/en-GB";
import { format } from "date-fns";
import { useCreateMissionMutation } from "services/missions/missionSlice";
import { useGetAllClientsQuery } from "services/clients/client.api.slice";
import { useGetAllCollaboratorsQuery } from "services/collaborator/collaborator.api.slice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 850,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  px: 4,
  py: 3,
};

const formStyle = { display: "flex", gap: 4, "& .MuiTextField-root": { width: "100%" } };

const blockStyle = { flex: 0.5, display: "flex", flexDirection: "column", gap: 2 };

const initialData = {
  nameMission: "",
  startingDateMission: null,
  endingDateMission: null,
  collaboratorId: null,
  customerId: null,
  customerContactLastname: "",
  customerContactFirstname: "",
  customerContactEmail: "",
  customerContactPhone: "",
  missionDescription: "",
  tauxJournalier: "",
};

export default function AddMission({ open, onClose }) {
  const [data, setData] = useState(initialData);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarErrClient, setSnackbarErrClient] = useState(false);
  const [snackbarErrCollab, setSnackbarErrCollab] = useState(false);

  const {
    data: Dclients,
    isError: isErrorClients,
    isLoading: isLoadingClients,
  } = useGetAllClientsQuery();
  const {
    data: Dcollaborators,
    isError: isErrorCollabs,
    isLoading: isLoadingCollabs,
  } = useGetAllCollaboratorsQuery();
  const [createMission, { error, isLoading, isSuccess }] = useCreateMissionMutation();

  useEffect(() => {
    if (isErrorClients && open) setSnackbarErrClient(true);
  }, [isErrorClients]);

  useEffect(() => {
    if (isErrorCollabs && open) setSnackbarErrCollab(true);
  }, [isErrorCollabs]);

  useEffect(() => {
    if (isSuccess) {
      setSnackbar(true);
      setData(initialData);
      onClose();
    }
  }, [isSuccess]);

  const handleCancellation = () => {
    setData(initialData);
    onClose();
  };

  const handleSubmit = async () => {
    const formattedData = {
      ...data,
      startingDateMission: format(data.startingDateMission, "dd/MM/yyyy"),
      endingDateMission: format(data.endingDateMission, "dd/MM/yyyy"),
    };

    createMission(formattedData);
  };

  const areRequiredFieldsEmpty = () => {
    const requiredFields = [
      "nameMission",
      "startingDateMission",
      "endingDateMission",
      "customerId",
      "customerContactLastname",
      "customerContactFirstname",
      "customerContactEmail",
      "customerContactPhone",
      "tauxJournalier",
    ];

    return requiredFields.some((field) => !data[field]);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbar}
        autoHideDuration={3000}
        onClose={() => setSnackbar(false)}
      >
        <Alert onClose={() => setSnackbar(false)} severity="success" sx={{ width: "100%" }}>
          Mission ajoutée avec success
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbarErrClient}
        autoHideDuration={3000}
        onClose={() => setSnackbarErrClient(false)}
      >
        <Alert onClose={() => setSnackbarErrClient(false)} severity="error" sx={{ width: "100%" }}>
          Oups, une erreur serveur s&lsquo;est produite lors du chargement des clients
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbarErrCollab}
        autoHideDuration={3000}
        onClose={() => setSnackbarErrCollab(false)}
      >
        <Alert onClose={() => setSnackbarErrCollab(false)} severity="error" sx={{ width: "100%" }}>
          Oups, une erreur serveur s&lsquo;est produite lors du chargement des collaborateurs
        </Alert>
      </Snackbar>

      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-add"
        aria-describedby="modal-add-mission"
      >
        <Box sx={style} component="form" noValidate autoComplete="off">
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Ajouter une mission
          </Typography>

          <Box sx={formStyle}>
            <Box sx={blockStyle}>
              <Typography id="modal-modal-description" variant="body2" component="p" sx={{ mt: 2 }}>
                Veuillez saisir les informations de la mission
              </Typography>

              <TextField
                variant="outlined"
                label="Nom de la mission"
                value={data.nameMission}
                onChange={(e) => setData({ ...data, nameMission: e.target.value })}
                required
                helperText={error?.validations?.nameMission}
                error={Boolean(error?.validations?.nameMission)}
                disabled={isLoading}
              />

              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
                <DatePicker
                  label="Date de début *"
                  value={data.startingDateMission}
                  onChange={(newValue) => setData({ ...data, startingDateMission: newValue })}
                  views={["day", "month", "year"]}
                  required
                  slotProps={{
                    textField: {
                      helperText: error?.validations?.startingDateMission,
                      error: Boolean(error?.validations?.startingDateMission),
                      disabled: isLoading,
                    },
                  }}
                />

                <DatePicker
                  label="Date de fin *"
                  value={data.endingdateMmission}
                  onChange={(newValue) => setData({ ...data, endingDateMission: newValue })}
                  views={["day", "month", "year"]}
                  required
                  slotProps={{
                    textField: {
                      helperText: error?.validations?.endingDateMission,
                      error: Boolean(error?.validations?.endingDateMission),
                      disabled: isLoading,
                    },
                  }}
                />
              </LocalizationProvider>

              <TextField
                select
                label="Client"
                size="normal"
                value={data.customerId}
                onChange={(e) => setData({ ...data, customerId: e.target.value })}
                required
                helperText={error?.validations?.customerId}
                error={Boolean(error?.validations?.customerId)}
                disabled={isLoading}
              >
                <MenuItem value="" disabled>
                  Sélectionner un client
                </MenuItem>
                {Dclients &&
                  Dclients.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.customerName}
                    </MenuItem>
                  ))}
              </TextField>

              <TextField
                select
                label="Collaborateur"
                value={data.collaboratorId}
                onChange={(e) => setData({ ...data, collaboratorId: e.target.value })}
                disabled={isLoading}
              >
                <MenuItem value="" disabled>
                  Sélectionner un collaborateur
                </MenuItem>
                {Dcollaborators
                  ? Dcollaborators.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {`${option.firstName} ${option.lastName}`}
                      </MenuItem>
                    ))
                  : ""}
              </TextField>

              <TextField
                variant="outlined"
                multiline
                rows={1}
                label="Taux journalier moyen"
                value={data.tauxJournalier}
                onChange={(e) => setData({ ...data, tauxJournalier: e.target.value })}
                disabled={isLoading}
              />
            </Box>

            <Box sx={blockStyle}>
              <Typography id="modal-modal-description" variant="body2" component="p" sx={{ mt: 2 }}>
                Contact du client
              </Typography>

              <TextField
                variant="outlined"
                label="Nom"
                value={data.customerContactLastname}
                onChange={(e) => setData({ ...data, customerContactLastname: e.target.value })}
                required
                helperText={error?.validations?.customerContactLastname}
                error={Boolean(error?.validations?.customerContactLastname)}
                disabled={isLoading}
              />

              <TextField
                variant="outlined"
                label="Prénom"
                value={data.customerContactFirstname}
                onChange={(e) => setData({ ...data, customerContactFirstname: e.target.value })}
                required
                helperText={error?.validations?.customerContactFirstname}
                error={Boolean(error?.validations?.customerContactFirstname)}
                disabled={isLoading}
              />

              <TextField
                variant="outlined"
                label="Email"
                value={data.customerContactEmail}
                onChange={(e) => setData({ ...data, customerContactEmail: e.target.value })}
                required
                helperText={error?.validations?.customerContactEmail}
                error={Boolean(error?.validations?.customerContactEmail)}
                disabled={isLoading}
              />

              <TextField
                variant="outlined"
                label="N° Télephone"
                value={data.customerContactPhone}
                onChange={(e) => setData({ ...data, customerContactPhone: e.target.value })}
                required
                helperText={error?.validations?.customerContactPhone}
                error={Boolean(error?.validations?.customerContactPhone)}
                disabled={isLoading}
              />

              <TextField
                variant="outlined"
                multiline
                rows={3}
                label="Descriptif de la mission (Facultatif)"
                value={data.MissionDescription}
                onChange={(e) => setData({ ...data, missionDescription: e.target.value })}
                disabled={isLoading}
              />
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
            <Button variant="text" color="error" onClick={handleCancellation}>
              Annuler
            </Button>

            <Button
              variant="contained"
              sx={{ color: "#FFFFFF" }}
              onClick={handleSubmit}
              disabled={isLoading || areRequiredFieldsEmpty()}
            >
              Créer la mission
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

AddMission.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
