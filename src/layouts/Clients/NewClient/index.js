import CancelIcon from "@mui/icons-material/Cancel";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SendIcon from "@mui/icons-material/Send";
import {
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
import { useEffect } from "react";
import { toast } from "react-toastify";

const NewClientPopup = () => {
  const dispatch = useDispatch();
  const openPopup = useSelector((s) => s.clients.openPopup);
  const formData = useSelector((s) => s.clients.newClientForm);
  const [createClient, { error, isLoading, isSuccess }] = useCreateClientMutation();

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

  useEffect(() => {
    if (isSuccess) {
      dispatch(togglePopup());
      dispatch(resetForm());
      toast.success("Le Client a été créé avec succès", {
        autoClose: 2000,
      });
    }
  }, [isSuccess]);

  function isFormValid(formData) {
    for (const key in formData) {
      if (formData.hasOwnProperty(key) && formData[key] === "") {
        return false;
      }
    }
    return true;
  }

  return (
    <>
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
                helperText={error?.validations?.customerEmail}
                error={Boolean(error?.validations?.customerEmail)}
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
                helperText={error?.validations?.customerName}
                error={Boolean(error?.validations?.customerName)}
              />
              <TextField
                value={formData.customerAddress}
                onChange={(e) => handleFormChange(e)}
                name="customerAddress"
                helperText={error?.validations?.customerAddress}
                error={Boolean(error?.validations?.customerAddress)}
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
                helperText={error?.validations?.customerPhone}
                error={Boolean(error?.validations?.customerPhone)}
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
                helperText={error?.validations?.customerTvaNumber}
                error={Boolean(error?.validations?.customerTvaNumber)}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Stack
              width="100%"
              justifyContent={"space-between"}
              direction={{ xs: "column", sm: "row" }}
            >
              <Button
                onClick={handleReset}
                endIcon={<RestartAltIcon />}
                disabled={isLoading}
                color="error"
              >
                Réinitialiser
              </Button>
              <Stack direction={{ xs: "column", sm: "row" }}>
                <Button
                  onClick={handleClose}
                  disabled={isLoading}
                  endIcon={<CancelIcon />}
                  color="error"
                >
                  Annuler
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading || !isFormValid(formData)}
                  endIcon={<SendIcon />}
                >
                  Créer le client
                </Button>
              </Stack>
            </Stack>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default NewClientPopup;
