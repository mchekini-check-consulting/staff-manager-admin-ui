import { Stack } from "@mui/material";
import ContentLayout from "components/ContentLayout";
import ContentNavbar from "components/ContentNavbar";
import ClientList from "./ClientList";

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
