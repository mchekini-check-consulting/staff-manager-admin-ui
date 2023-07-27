/* eslint-disable react/prop-types */
import React, { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

import Dialog from "@mui/material/Dialog";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PdfPreview = ({ url }) => {
  const [numPages, setNumPages] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <Document
      file={url}
      onLoadSuccess={onDocumentLoadSuccess}
      onLoadError={console.error}
      className="pdf-document"
      pageNumber={numPages}
    >
      {Array.from(new Array(numPages), (el, index) => (
        <Page key={`page_${index + 1}`} pageNumber={index + 1} />
      ))}
    </Document>
  );
};

export default function FullScreenDialog({ isOpen, onClose, file, ext }) {
  return (
    <div>
      <Dialog fullScreen open={isOpen} onClose={onClose} TransitionComponent={Transition}>
        <CloseIcon className="close-btn" onClick={onClose} />

        <div className="modal-content">
          {ext === "pdf" ? (
            <PdfPreview url={file} />
          ) : ["jpeg", "jpg"].includes(ext) ? (
            <img src={file} className="image-preview" />
          ) : (
            "Type de fichier non supporté"
          )}
        </div>
      </Dialog>
    </div>
  );
}
