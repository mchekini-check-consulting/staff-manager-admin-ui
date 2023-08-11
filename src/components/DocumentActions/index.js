/* eslint-disable react/prop-types */
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import { useLazyGetDocCollabQuery } from "../../services/justificatifs/justificatif.api.slice";
import FullScreenDialog from "../FullScreenDialog";
import { Box } from "@mui/material";

const getExtension = (filename) => filename.split(".").pop();

const DocumentActions = ({ params }) => {
  const [isOpen, setIsOpen] = useState(false);
  const DOC_NAME = params.row.name;

  const [getDocs, { data: getDocCollab, error: errorDoc, isLoading: isLoadingDoc }] =
    useLazyGetDocCollabQuery();

  const DOC_URL = getDocCollab && getDocCollab;

  const onPreview = () => {
    getDocs(DOC_NAME);
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };

  const onDownload = () => {
    getDocs(DOC_NAME);
    const link = document.createElement("a");
    link.href = getDocCollab;
    link.target = "_blank";
    link.download = DOC_NAME;
    link.click();
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-evenly", width: "100%" }}>
        <VisibilityIcon onClick={onPreview} sx={{ cursor: "pointer" }} fontSize="medium" />
        <DownloadIcon onClick={onDownload} sx={{ cursor: "pointer" }} fontSize="medium" />
      </Box>
      {DOC_URL && (
        <FullScreenDialog
          isOpen={isOpen}
          onClose={onClose}
          file={DOC_URL}
          ext={getExtension(DOC_NAME)}
        />
      )}
    </>
  );
};

export default DocumentActions;
