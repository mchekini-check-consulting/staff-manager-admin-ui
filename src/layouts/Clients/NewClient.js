import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";

const NewClient = () => {
  const [newClientModal, setNewClientModal] = useState(false);

  const handleOpen = (e) => {
    setNewClientModal(true);
  };
  const handleClose = () => {
    setNewClientModal(false);
  };

  useEffect(() => {
    console.log("formData", formData);
  });

  const [formData, setFormData] = useState({
    email: "",
    nom: "",
    adresse: "",
    telephone: "",
    tva: "",
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Button onClick={handleOpen} variant="contained" color="warning" sx={{ color: "#333" }}>
        Nouveau Client ➕
      </Button>
      <Dialog open={newClientModal} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Créer Un Nouveau Client ➕</DialogTitle>
        <DialogContent>
          <DialogContentText pb={2}>
            Notez que les champs marqué par <code style={{ color: "red" }}>*</code> sont
            obligatoires.
          </DialogContentText>
          <form>
            <TextField
              value={formData.email}
              onChange={(e) => handleFormChange(e)}
              autoFocus
              name="email"
              label="Email"
              type="email"
              margin="dense"
              required
              fullWidth
              variant="outlined"
            />
            <TextField
              value={formData.nom}
              onChange={(e) => handleFormChange(e)}
              name="nom"
              label="Nom"
              margin="dense"
              type="text"
              required
              fullWidth
              variant="outlined"
            />
            <TextField
              value={formData.adresse}
              onChange={(e) => handleFormChange(e)}
              name="adresse"
              required
              label="Adresse"
              margin="dense"
              type="Nom"
              fullWidth
              variant="outlined"
            />
            <TextField
              value={formData.telephone}
              required
              onChange={(e) => handleFormChange(e)}
              name="telephone"
              label="N° Telephone"
              margin="dense"
              type="tel"
              fullWidth
            />
            <TextField
              value={formData.tva}
              onChange={(e) => handleFormChange(e)}
              name="tva"
              label="N° TVA"
              margin="dense"
              required
              type="number"
              fullWidth
              variant="outlined"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} endIcon={<CancelIcon />} color="error">
            Annuler
          </Button>
          <Button onClick={handleClose} endIcon={<SendIcon />}>
            Envoyer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewClient;
