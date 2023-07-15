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

const clientsData = [
  {
    value: 1,
    label: "Client 1",
  },
  {
    value: 2,
    label: "Client 2",
  },
  {
    value: 3,
    label: "Client 3",
  },
];
const collabsData = [
  {
    value: 1,
    label: "Collaborateur 1",
  },
  {
    value: 2,
    label: "Collaborateur 2",
  },
  {
    value: 3,
    label: "Collaborateur 3",
  },
];

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
};

export default function AddMission({ open, onClose }) {
  const [data, setData] = useState(initialData);
  const [clients] = useState(clientsData);
  const [collaborators] = useState(collabsData);
  const [snackbar, setSnackbar] = useState(false);

  const [createMission, { error, isLoading, isSuccess }] = useCreateMissionMutation();

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
                helperText={error?.data?.nameMission}
                error={Boolean(error?.data?.nameMission)}
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
                      helperText: error?.data?.startingDateMission,
                      error: Boolean(error?.data?.startingDateMission),
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
                      helperText: error?.data?.endingDateMission,
                      error: Boolean(error?.data?.endingDateMission),
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
                helperText={error?.data?.customerId}
                error={Boolean(error?.data?.customerId)}
                disabled={isLoading}
              >
                <MenuItem value="" disabled>
                  Sélectionner un client
                </MenuItem>
                {clients.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
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
                {collaborators.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
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
                helperText={error?.data?.customerContactLastname}
                error={Boolean(error?.data?.customerContactLastname)}
                disabled={isLoading}
              />

              <TextField
                variant="outlined"
                label="Prénom"
                value={data.customerContactFirstname}
                onChange={(e) => setData({ ...data, customerContactFirstname: e.target.value })}
                required
                helperText={error?.data?.customerContactFirstname}
                error={Boolean(error?.data?.customerContactFirstname)}
                disabled={isLoading}
              />

              <TextField
                variant="outlined"
                label="Email"
                value={data.customerContactEmail}
                onChange={(e) => setData({ ...data, customerContactEmail: e.target.value })}
                required
                helperText={error?.data?.customerContactEmail}
                error={Boolean(error?.data?.customerContactEmail)}
                disabled={isLoading}
              />

              <TextField
                variant="outlined"
                label="N° Télephone"
                value={data.customerContactPhone}
                onChange={(e) => setData({ ...data, customerContactPhone: e.target.value })}
                required
                helperText={error?.data?.customerContactPhone}
                error={Boolean(error?.data?.customerContactPhone)}
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
