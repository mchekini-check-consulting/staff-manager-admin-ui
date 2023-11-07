import React, { useState } from "react";
import ContentLayout from "components/ContentLayout";
import ContentNavbar from "components/ContentNavbar";
import {
  Button,
  InputLabel,
  FormControl,
  Select,
  OutlinedInput,
  Box,
  Typography,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useGetAllCollaboratorsQuery } from "../../services/collaborator/collaborator.api.slice";
import { useCreateWorkCertificateMutation } from "../../services/workcertificate/workcertificate.api.slice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Attestation() {
  const [selectedCollab, setSelectedCollab] = useState();

  const {
    data: allCollaborators,
    error: collaboratorsError,
    isLoading: loadingCollaborators,
  } = useGetAllCollaboratorsQuery();

  const [createWorkCertificate, { isError, isLoading, isSuccess }] =
    useCreateWorkCertificateMutation();

  const Loading = <Typography variant="body2">Chargement ...</Typography>;
  const Error = <Typography variant="body2">Erreur !</Typography>;
  const Empty = <Typography variant="body2">Aucun élément n{"\u2019"}est trouvé</Typography>;

  const styles = {
    header: {
      flexDirection: "column",
      justifyContent: "space-between",
      display: "flex",
      padding: 4,
      mt: 4,
      mb: 4,
    },
  };

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

  const handleGenerateAttestaion = async () => {
    const response = await createWorkCertificate({ collaboratorId: selectedCollab.id });
    if (response.data) {
      const link = document.createElement("a");
      link.href = response.data && response.data;
      link.target = "_blank";
      link.download = `ADT-${selectedCollab.lastName}-${selectedCollab.firstName}.pdf`;
      link.click();
    }
  };

  return (
    <ContentLayout>
      <ContentNavbar />
      <Box sx={styles.header}>
        <FormControl
          sx={{ width: "60%", marginLeft: "auto", marginRight: "auto", marginBottom: "100px" }}
        >
          <InputLabel>Collaborateur</InputLabel>
          <Select
            labelId="demo-unique-name-label"
            id="demo-unique-name"
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

        <Button
          onClick={handleGenerateAttestaion}
          disabled={isLoading || !selectedCollab}
          variant="contained"
          sx={{
            color: "#FFFFFF",
            width: "40%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          générer
        </Button>
      </Box>
      {isError ? (
        toast.error(
          "Oups, une erreur serveur c'est produite en essayant de générer l'attestation de travail",
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        )
      ) : isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </div>
      ) : isSuccess ? (
        toast.success("Génération l'attestation de travail éffectuée avec succès !", {
          position: toast.POSITION.TOP_RIGHT,
        })
      ) : null}
    </ContentLayout>
  );
}
export default Attestation;
