/* eslint-disable react/prop-types */
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import { useLazyGetInvoiceDocQuery } from "../../services/invoice/invoice.api.slice";
import FullScreenDialog from "../FullScreenDialog";
import { Box } from "@mui/material";

const getExtension = (filename) => filename.split(".").pop();

const FactureAction = ({ params }) => {
  const [isOpen, setIsOpen] = useState(false);
  const INVOICE_NAME = params.row.name;

  const [getInvoiceDoc, { data: invoiceData, error: errorDoc, isLoading: isLoadingDoc }] =
    useLazyGetInvoiceDocQuery();

  const INVOICE_URL = invoiceData && invoiceData;

  const onPreview = () => {
    getInvoiceDoc(INVOICE_NAME);
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };

  const onDownload = () => {
    getInvoiceDoc(INVOICE_NAME);
    const link = document.createElement("a");
    link.href = INVOICE_URL;
    link.target = "_blank";
    link.download = INVOICE_NAME;
    link.click();
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-evenly", width: "100%" }}>
        <VisibilityIcon onClick={onPreview} sx={{ cursor: "pointer" }} fontSize="medium" />
        <DownloadIcon onClick={onDownload} sx={{ cursor: "pointer" }} fontSize="medium" />
      </Box>
      {INVOICE_URL && (
        <FullScreenDialog
          isOpen={isOpen}
          onClose={onClose}
          file={INVOICE_URL}
          ext={getExtension(INVOICE_NAME)}
        />
      )}
    </>
  );
};

export default FactureAction;
