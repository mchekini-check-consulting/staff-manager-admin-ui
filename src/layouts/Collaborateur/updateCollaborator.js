/* eslint-disable react/prop-types */
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useUpdateCollaboratorMutation } from "services/collaborator/collaborator.api.slice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};

export default function UpdateCollaboratorForm({
  collaborator,
  isOpen,
  handleClose,
  setCollaboratorToUpdate,
  existingCollaborators,
  setCollaborateurs,
  style,
}) {
  const [updateCollaborator, { error, isLoading, isSuccess }] = useUpdateCollaboratorMutation();

  useEffect(() => {
    if (isSuccess) {
      handleClose(false);
      setCollaborateurs(
        existingCollaborators.map((obj) => (obj.id == collaborator.id ? collaborator : obj))
      );

      toast.success("Le collaborateur a été modifié avec succès", {
        autoClose: 2000,
      });
    }
  }, [isSuccess]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCollaboratorToUpdate({ ...collaborator, [name]: value });
  };
  const handleSubmit = (event) => {
    updateCollaborator(collaborator);
  };
  const disableSubmitBtn = () => {
    return (
      !(
        collaborator.firstName &&
        collaborator.lastName &&
        collaborator.email &&
        collaborator.phone &&
        collaborator.address
      ) ||
      JSON.stringify(existingCollaborators.find((obj) => obj.id == collaborator.id)) ==
        JSON.stringify(collaborator)
    );
  };
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-update-collaborator"
      aria-describedby="modal-update-collaborator"
    >
      <Box sx={style}>
        <Typography variant="h6" component="h2" sx={{ textAlign: "center", marginBottom: "2rem" }}>
          Changer les informations du collaborateur
        </Typography>
        <form style={formStyle} onSubmit={handleSubmit}>
          {error && (
            <Typography variant="body2" sx={{ textAlign: "center", color: "red" }}>
              {error.message}
            </Typography>
          )}
          <TextField
            name="firstName"
            label="Prénom"
            value={collaborator.firstName}
            onChange={handleChange}
            required
            variant="outlined"
            disabled={isLoading}
            error={Boolean(error?.validations?.firstName)}
            helperText={error?.validations?.firstName}
          />
          <TextField
            name="lastName"
            label="Nom"
            value={collaborator.lastName}
            onChange={handleChange}
            required
            variant="outlined"
            disabled={isLoading}
            error={Boolean(error?.validations?.lastName)}
            helperText={error?.validations?.lastName}
          />
          <TextField
            name="email"
            label="Email"
            value={collaborator.email}
            onChange={handleChange}
            required
            variant="outlined"
            disabled={isLoading}
            error={
              Boolean(error?.validations?.email) || error?.message?.includes("l'email existe dèjâ")
            }
            helperText={error?.validations?.email}
          />
          <TextField
            name="phone"
            label="Téléphone"
            value={collaborator.phone}
            onChange={handleChange}
            required
            variant="outlined"
            disabled={isLoading}
            error={
              Boolean(error?.validations?.phone) ||
              error?.message?.includes("le numéro de téléphone existe dèjâ")
            }
            helperText={error?.validations?.phone}
          />
          <TextField
            name="address"
            label="Adresse"
            value={collaborator.address}
            onChange={handleChange}
            required
            variant="outlined"
            disabled={isLoading}
            error={Boolean(error?.validations?.address)}
            helperText={error?.validations?.address}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="text" color="error" onClick={handleClose}>
              Annuler
            </Button>
            <Button onClick={handleSubmit} disabled={isLoading || disableSubmitBtn()}>
              Modifier le client
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
