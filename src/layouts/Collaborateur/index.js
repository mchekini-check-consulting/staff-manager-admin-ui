import ContentLayout from "components/ContentLayout";
import ContentNavbar from "components/ContentNavbar";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCreateCollaboratorMutation } from "../../services/collaborator/collaborator.api.slice";

function createData(id, firstName, lastName, email, phone, address) {
  return { id, firstName, lastName, email, phone, address };
}

const rows = [
  createData(
    1,
    "Collaborateur1",
    "Collaborateur1",
    "collaborateur1@mail.com",
    "0000000000",
    "Adresse 1"
  ),
  createData(
    2,
    "Collaborateur2",
    "Collaborateur2",
    "collaborateur2@mail.com",
    "1111111111",
    "Adresse 2"
  ),
];

const collaborateurColumns = [
  { field: "firstName", headerName: "Prénom", flex: 1 },
  {
    field: "lastName",
    headerName: "Nom",
    flex: 1,
  },
  { field: "email", headerName: "Email", flex: 1 },
  {
    field: "phone",
    headerName: "Téléphone",
    flex: 1,
  },
  { field: "address", headerName: "Adresse", flex: 1 },
];

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "#f5f5f5",
  border: "2px solid #ccc",
  boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)",
  borderRadius: "8px",
  p: 4,
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "2rem",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};

function Collaborateur() {
  const [createCollaborator, { error, isLoading, isSuccess }] = useCreateCollaboratorMutation();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [collaborateurs, setCollaborateurs] = useState(rows);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (isSuccess) {
      // Générer un nouvel ID pour le collaborateur
      const newId = Math.max(...collaborateurs.map((c) => c.id)) + 1;

      // Ajouter le collaborateur avec les données du formulaire
      const newCollaborateur = {
        id: newId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
      };
      // Ajouter le nouveau collaborateur à la liste des collaborateurs
      setCollaborateurs([...collaborateurs, newCollaborateur]);
      // Afficher la notification de succès
      toast.success("Le collaborateur a été créé avec succès", {
        autoClose: 2000,
      });
      // Réinitialiser les valeurs du formulaire
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
      });
      // Fermer la popup
      setOpen(false);
    } else if (error) {
      toast.error("Erreur lors de la création du collaborateur", {
        autoClose: 2000,
      });
    }
  }, [isSuccess, error]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.phone &&
      formData.address
    ) {
      createCollaborator(formData);
    }
  };
  const buttonStyle = {
    alignSelf: "flex-start",
    marginTop: collaborateurs.length > 5 ? "1rem" : "auto",
    backgroundColor: "#4caf50",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#45a049",
    },
  };
  const buttonStyle2 = {
    alignSelf: "flex-end",
    marginTop: collaborateurs.length > 5 ? "1rem" : "auto",
    backgroundColor: "#4caf50",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#45a049",
    },
  };

  return (
    <ContentLayout>
      <ContentNavbar />

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ flex: 1 }}>
          <DataGrid
            rows={collaborateurs}
            columns={collaborateurColumns}
            pageSize={5}
            autoHeight
            components={{ Toolbar: null }}
          />
        </div>

        <Button onClick={handleOpen} variant="contained" style={buttonStyle}>
          Ajouter Collaborateur
        </Button>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" sx={titleStyle}>
            Veuillez saisir les informations du collaborateur
          </Typography>
          <form style={formStyle} onSubmit={handleSubmit}>
            <TextField
              name="firstName"
              label="Prénom"
              value={formData.firstName}
              onChange={handleChange}
              required
              variant="outlined"
              disabled={isLoading}
              error={Boolean(error?.data?.firstName)}
              helperText={error?.data?.firstName}
            />
            <TextField
              name="lastName"
              label="Nom"
              value={formData.lastName}
              onChange={handleChange}
              required
              variant="outlined"
              disabled={isLoading}
              error={Boolean(error?.data?.lastName)}
              helperText={error?.data?.lastName}
            />
            <TextField
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              required
              variant="outlined"
              disabled={isLoading}
              error={Boolean(error?.data?.email)}
              helperText={error?.data?.email}
            />
            <TextField
              name="phone"
              label="Téléphone"
              value={formData.phone}
              onChange={handleChange}
              required
              variant="outlined"
              disabled={isLoading}
              error={Boolean(error?.data?.phone)}
              helperText={error?.data?.phone}
            />
            <TextField
              name="address"
              label="Adresse"
              value={formData.address}
              onChange={handleChange}
              required
              variant="outlined"
              disabled={isLoading}
              error={Boolean(error?.data?.address)}
              helperText={error?.data?.address}
            />
            <Button
              type="submit"
              variant="contained"
              style={buttonStyle2}
              disabled={
                isLoading ||
                !(
                  formData.firstName &&
                  formData.lastName &&
                  formData.email &&
                  formData.phone &&
                  formData.address
                )
              }
            >
              Ajouter
            </Button>
          </form>
        </Box>
      </Modal>

      <ToastContainer autoClose={2000} />
    </ContentLayout>
  );
}

export default Collaborateur;
