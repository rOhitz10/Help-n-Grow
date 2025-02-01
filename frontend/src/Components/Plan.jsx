// import React, { useState } from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';

// // Set the worker source
// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// const Plan = () => {
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

//   return (
//     <div>
//       <Document
//         file="/HNG-Slides.pdf" // Ensure the file is in the `public` folder
//         onLoadSuccess={onDocumentLoadSuccess}
//         onLoadError={(error) => console.error("Document load error:", error)}
//         onSourceError={(error) => console.error("Source error:", error)}
//       >
//         <Page pageNumber={pageNumber} />
//       </Document>
//       <p>
//         Page {pageNumber} of {numPages || "?"}
//       </p>
//     </div>
//   );
// };

// export default Plan;




import  React from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const Plan = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
      <Viewer
        fileUrl="/HNG-Slides.pdf"
        plugins={[defaultLayoutPluginInstance]}
      />
    </Worker>
  );
};

export default Plan;