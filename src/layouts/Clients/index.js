import ContentLayout from "components/ContentLayout";
import ContentNavbar from "components/ContentNavbar";
import NewClient from "./NewClient/index";
import ClientList from "./ClientList";
import { Stack } from "@mui/material";

function Clients() {
  return (
    <ContentLayout>
      <ContentNavbar />
      <Stack>
        <ClientList />
      </Stack>
    </ContentLayout>
  );
}

export default Clients;
