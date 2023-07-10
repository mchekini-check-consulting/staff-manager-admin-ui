import ContentLayout from "components/ContentLayout";
import ContentNavbar from "components/ContentNavbar";
import NewClient from "./NewClient";
import ClientList from "./ClientList";
import { Stack } from "@mui/material";

function Clients() {
  return (
    <ContentLayout>
      <ContentNavbar />
      <Stack gap={2}>
        <Stack alignItems={"flex-end"}>
          <NewClient />
        </Stack>
        <Stack>
          <ClientList />
        </Stack>
      </Stack>
    </ContentLayout>
  );
}

export default Clients;
