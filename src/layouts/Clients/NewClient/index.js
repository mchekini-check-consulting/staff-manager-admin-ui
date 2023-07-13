import CancelIcon from "@mui/icons-material/Cancel";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SendIcon from "@mui/icons-material/Send";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { resetForm, togglePopup, updateForm } from "services/clients/client.slice";
import { useCreateClientMutation } from "services/clients/client.api.slice";

const NewClient = () => {
  const dispatch = useDispatch();
  const openPopup = useSelector((s) => s.clients.openPopup);
  const formData = useSelector((s) => s.clients.newClientForm);
  const [createClient, { error, isLoading, isError }] = useCreateClientMutation();

  const handleOpen = (e) => {
    dispatch(togglePopup());
  };

  const handleClose = () => {
    dispatch(resetForm());
    dispatch(togglePopup());
  };

  const handleReset = () => {
    dispatch(resetForm());
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateForm({ name, value }));
  };

  const handleSubmit = () => {
    createClient(formData);
  };

  return (
    <>
      <Button onClick={handleOpen} variant="contained" color="warning" sx={{ color: "#333" }}>
        Nouveau Client ➕
      </Button>
      <Dialog open={openPopup} onClose={handleClose} fullWidth maxWidth="md">
        <Box p={2}>
          <DialogTitle>Créer Un Nouveau Client</DialogTitle>
          <DialogContent>
            <DialogContentText pb={2}>
              Notez que les champs marqué par <code style={{ color: "red" }}>astérisque *</code>{" "}
              sont obligatoires.
            </DialogContentText>
            <form>
              <TextField
                value={formData.customerEmail}
                onChange={(e) => handleFormChange(e)}
                autoFocus
                name="customerEmail"
                label="Email"
                type="email"
                margin="dense"
                required
                fullWidth
                variant="outlined"
                disabled={isLoading}
              />
              <TextField
                value={formData.customerName}
                onChange={(e) => handleFormChange(e)}
                name="customerName"
                label="Nom"
                margin="dense"
                type="text"
                required
                fullWidth
                disabled={isLoading}
                variant="outlined"
              />
              <TextField
                value={formData.customerAddress}
                onChange={(e) => handleFormChange(e)}
                name="customerAddress"
                required
                label="Adresse"
                margin="dense"
                type="Nom"
                disabled={isLoading}
                fullWidth
                variant="outlined"
              />
              <TextField
                value={formData.customerPhone}
                required
                onChange={(e) => handleFormChange(e)}
                name="customerPhone"
                label="N° Telephone"
                disabled={isLoading}
                margin="dense"
                type="tel"
                fullWidth
              />
              <TextField
                value={formData.customerTvaNumber}
                onChange={(e) => handleFormChange(e)}
                name="customerTvaNumber"
                label="N° TVA"
                margin="dense"
                disabled={isLoading}
                required
                fullWidth
                variant="outlined"
              />
            </form>
            {isError && (
              <Alert severity="error" py={2}>
                {error?.data?.data?.map((item, index) => {
                  return (
                    <div key={index}>
                      <ul>
                        <li> - {item.errorMessage}</li>
                      </ul>
                    </div>
                  );
                })}
                {error?.data?.message}
              </Alert>
            )}
          </DialogContent>
          <DialogActions>
            <Stack width="100%" justifyContent={"space-between"} direction={"row"}>
              <Button
                onClick={handleReset}
                endIcon={<RestartAltIcon />}
                disabled={isLoading}
                color="error"
              >
                Réinitialiser
              </Button>
              <Stack direction={"row"}>
                <Button
                  onClick={handleClose}
                  disabled={isLoading}
                  endIcon={<CancelIcon />}
                  color="error"
                >
                  Annuler
                </Button>
                <Button onClick={handleSubmit} disabled={isLoading} endIcon={<SendIcon />}>
                  Envoyer
                </Button>
              </Stack>
            </Stack>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default NewClient;
