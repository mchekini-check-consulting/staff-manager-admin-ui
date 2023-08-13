/* eslint-disable prettier/prettier */
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
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useUpdateClientMutation } from "services/clients/client.api.slice";
import {
  initData,
  onChangeClientForm,
  resetUpdateForm,
  toggleUpdatePopup,
} from "services/clients/client.slice";

const UpdateClientPopup = (props) => {
  const { row } = props;
  const [isCustomerEqual, setIsCustomerEqual] = useState(true);
  const [formError, setFormError] = useState();
  const dispatch = useDispatch();
  const openUpdatePopup = useSelector((s) => s.clients.openUpdatePopup);
  const formData = useSelector((s) => s.clients.updateClientForm);
  const [updateClient, { error, isLoading, isSuccess }] = useUpdateClientMutation();

  const handleClose = () => {
    dispatch(toggleUpdatePopup());
    dispatch(resetUpdateForm());
    setFormError();
  };

  const handleReset = () => {
    dispatch(initData(row));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    dispatch(onChangeClientForm({ name, value }));
  };

  const handleSubmit = () => {
    updateClient(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(toggleUpdatePopup());
      dispatch(resetUpdateForm());
      toast.success("Le Client a été modifié avec succès", {
        autoClose: 2000,
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      setFormError(error);
    }
  }, [error]);

  useEffect(() => {
    checkUnchangedData();
  }, [row, formData]);

  const checkUnchangedData = () => {
    setIsCustomerEqual(
      row?.customerEmail == formData.customerEmail &&
        row?.customerAddress == formData.customerAddress &&
        row?.customerName == formData.customerName &&
        row?.customerPhone == formData.customerPhone &&
        row?.customerTvaNumber == formData.customerTvaNumber
    );
  };

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
      <Dialog open={openUpdatePopup} onClose={handleClose} fullWidth maxWidth="md">
        <Box p={2}>
          <DialogTitle>Modifier Un Client</DialogTitle>
          <DialogContent>
            <DialogContentText pb={1}>
              Notez que les champs marqué par <code style={{ color: "red" }}>astérisque *</code>{" "}
              sont obligatoires.
            </DialogContentText>
            {formError && (
              <Typography variant="body2" sx={{ mb: 1, color: "red" }}>
                {formError.message}
              </Typography>
            )}
            <form>
              <TextField
                value={formData?.customerEmail}
                onChange={(e) => handleFormChange(e)}
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
                value={formData?.customerName}
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
                value={formData?.customerAddress}
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
                value={formData?.customerPhone}
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
                value={formData?.customerTvaNumber}
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
                  onClick={() => handleSubmit()}
                  disabled={isLoading || !isFormValid(formData) || isCustomerEqual}
                  endIcon={<SendIcon />}
                >
                  Modifier le client
                </Button>
              </Stack>
            </Stack>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

UpdateClientPopup.propTypes = {
  row: PropTypes.any,
};

export default UpdateClientPopup;
