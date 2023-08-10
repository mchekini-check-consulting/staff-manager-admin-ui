import { Stack } from "@mui/material";
import NewSocietyPopup from "./NewSociety";
import EnteteDatagrid from "components/EnteteDatagrid";
import { useDispatch } from "react-redux";
import { togglePopup } from "services/society/society.slice";

const SocietyInformation = () => {
  const dispatch = useDispatch();
  const handleOpen = () => {
    dispatch(togglePopup());
  };

  return (
    <div>
      <NewSocietyPopup />
      <Stack gap={2}>
        <EnteteDatagrid
          enteteText={"Societe"}
          ctaButtonOnClick={handleOpen}
          ctaButtonText={"Ajouter les données de la société"}
        />
      </Stack>
    </div>
  );
};
export default SocietyInformation;
