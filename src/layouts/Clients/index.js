import ContentLayout from "components/ContentLayout";
import ContentNavbar from "components/ContentNavbar";
import NewClient from "./NewClient";
import { Stack } from "@mui/material";

function Clients() {
  return (
    <ContentLayout>
      <ContentNavbar />
      <Stack alignItems={"flex-end"}>
        <NewClient />
      </Stack>
    </ContentLayout>
  );
}

export default Clients;
