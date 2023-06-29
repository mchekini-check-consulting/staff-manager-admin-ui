import { Link } from "@mui/material";
import MDBox from "components/MD/MDBox";
import ContentLayout from "components/ContentLayout";
import ContentNavbar from "components/ContentNavbar";

function Documentation() {
  return (
    <ContentLayout>
      <ContentNavbar />
      <MDBox>
        Pour accéder à la documentation du thème : {""}
        <Link
          color={"red"}
          target="_blank"
          href="https://mui.com/material-ui/getting-started/overview/"
        >
          Cliquez ici
        </Link>
      </MDBox>
    </ContentLayout>
  );
}

export default Documentation;
