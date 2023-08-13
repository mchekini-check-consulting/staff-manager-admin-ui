import { Box, CircularProgress, Grid, Paper, Stack } from "@mui/material";
import NewSocietyPopup from "./NewSociety";
import EnteteDatagrid from "components/EnteteDatagrid";
import { useDispatch } from "react-redux";
import { togglePopup } from "services/society/society.slice";
import { useGetSocietyQuery } from "services/society/society.api.slice";
import PropTypes from "prop-types";

const Item = ({ label, value }) => (
  <>
    <Grid item xs={6} sx={{ textAlign: "right", pr: 2 }}>
      {label}
    </Grid>
    <Grid item xs={6}>
      {value}
    </Grid>
  </>
);

Item.propTypes = {
  label: PropTypes.str,
  value: PropTypes.str,
};

const SocietyInformation = () => {
  const dispatch = useDispatch();
  const handleOpen = () => {
    dispatch(togglePopup());
  };

  const { data, isLoading } = useGetSocietyQuery();

  console.log(data);

  return (
    <div>
      <NewSocietyPopup />
      <Stack gap={2}>
        <EnteteDatagrid
          enteteText={"Societe"}
          ctaButtonOnClick={handleOpen}
          ctaButtonText={"Ajouter les données de la société"}
          ctaButtonDisabled={data || isLoading}
        />
      </Stack>

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", pt: 4 }}>
          <CircularProgress />
        </Box>
      ) : null}

      {data ? (
        <Grid container spacing={2} rowGap={2} sx={{ mt: 2 }}>
          <Item label="Nom de la société : " value={data.name} />
          <Item label="N° de SIRET : " value={data.siret} />
          <Item label="N° de TVA : " value={data.vat} />
          <Item label="Contact : " value={data.contact} />
          <Item label="Email : " value={data.email} />
          <Item label="Adresse : " value={data.address} />
          <Item label="Capital : " value={data.capital} />
        </Grid>
      ) : null}
    </div>
  );
};
export default SocietyInformation;
