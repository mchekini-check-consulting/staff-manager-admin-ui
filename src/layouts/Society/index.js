import { Stack } from "@mui/material";
import ContentLayout from "components/ContentLayout";
import ContentNavbar from "components/ContentNavbar";
import "react-toastify/dist/ReactToastify.css";
import SocietyInformation from "./SocietyInformation";

export default function Society() {
  return (
    <>
      <ContentLayout>
        <ContentNavbar />
        <Stack>
          <SocietyInformation />
        </Stack>
      </ContentLayout>
    </>
  );
}
