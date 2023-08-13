import ContentLayout from "components/ContentLayout";
import ContentNavbar from "components/ContentNavbar";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Box,
  DialogTitle,
  DialogActions,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import {
  useGetActivitiesQuery,
  useValidateCraMutation,
} from "services/activity/activity.api.slice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import CustomDataGrid from "components/CustomDataGrid";
import { useState, useEffect } from "react";

function Activity() {
  const { tokenPersisted } = useSelector((state) => state.generalSlice);
  const [openDialog, setOpenDialog] = useState(false);
  const [collabId, setcollabId] = useState(null);

  const { data, error, isLoading } = useGetActivitiesQuery(null, {
    skip: !tokenPersisted,
  });

  const [validateCra, { error: validateCraError, isSuccess }] = useValidateCraMutation();
  const handleValidateCra = (id) => {
    validateCra(id);
  };

  const toggleDialog = (id) => {
    setcollabId(id);
    setOpenDialog((v) => !v);
  };

  const handleConfirm = (decision) => {
    if (decision === true) {
      handleValidateCra(collabId);
    }
    toggleDialog();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Une facture est crée avec success pour chaque client pour le mois en cours", {
        autoClose: 2000,
      });
    }
  }, [isSuccess]);

  const columns = [
    {
      field: "collaboratorFullName",
      headerName: "Collaborateur",
      valueGetter: (params) => {
        return `${params.row.collaboratorFirstName || ""} ${params.row.collaboratorLastName || ""}`;
      },
      flex: 1,
    },
    { field: "declaredDays", headerName: "Jours Déclarés", flex: 1 },
    { field: "billedDays", headerName: "Jours Facturés", flex: 1 },
    { field: "rttRedemption", headerName: "Rachat de RTT", flex: 1 },
    { field: "absenceDays", headerName: "Jours d'absence", flex: 1 },
    { field: "extraHoursInDays", headerName: "Heures Supplémentaires (j)", flex: 1 },
    { field: "onCallHoursInDays", headerName: "Heures d'astreintes (j)", flex: 1 },
    {
      field: "actions",
      headerName: " ",
      flex: 1.5,
      renderCell: (params) => (
        <Box sx={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
          <Button
            variant="contained"
            color="success"
            size="small"
            sx={{ color: "green" }}
            onClick={() => toggleDialog(params.row.collaboratorId)}
          >
            Valider
          </Button>
          <Button variant="contained" color="error" size="small" sx={{ color: "red" }}>
            Rejeter
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <ContentLayout>
      <ContentNavbar />
      <Box>
        <Dialog
          fullWidth={"md"}
          maxWidth={"md"}
          open={openDialog}
          onClose={() => setOpenDialog(false)}
        >
          <Box p={2}>
            <DialogTitle>
              Êtes-vous sûr de vouloir valider ce compte rendu d&apos;activité ?
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                La validation créera immédiatement une facture pour chaque mission et pour chaque
                client pour le mois en cours
              </DialogContentText>
            </DialogContent>
          </Box>
          <DialogActions>
            <Button onClick={() => handleConfirm(false)} color="error" autoFocus>
              Annuler
            </Button>
            <Button onClick={() => handleConfirm(true)}>Confirmer</Button>
          </DialogActions>
        </Dialog>
        {error ? (
          toast.error("Une erreur serveur c'est produite en essayant de récupérer les CRA.", {
            position: toast.POSITION.TOP_RIGHT,
          })
        ) : isLoading ? (
          <CircularProgress />
        ) : data ? (
          <CustomDataGrid
            rows={data.map((item, index) => ({ ...item, id: index }))}
            columns={columns}
          />
        ) : null}
        {Boolean(validateCraError?.message)
          ? toast.error(validateCraError?.message, {
              position: toast.POSITION.TOP_RIGHT,
            })
          : null}
      </Box>
    </ContentLayout>
  );
}

export default Activity;
