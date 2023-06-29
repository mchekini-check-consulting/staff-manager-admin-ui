import { Link } from "@mui/material";
import MDBox from "components/MDBox";
import ContentLayout from "examples/ContentLayout";
import ContentNavbar from "examples/ContentNavbar";

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
