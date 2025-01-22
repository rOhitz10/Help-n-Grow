
import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import pdfFile from "../assets/HNG-Slides.pdf";
// const pdfFile  = '/public/HNG-Slides.pdf';

const Plan = () => {
  const [numPages, setNumPages] = useState(null);

  function onLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full h-[80vh] p-4 bg-gray-100 rounded-lg shadow-lg">
        <Document file={pdfFile} onLoadSuccess={onLoadSuccess}>
          {[...Array(numPages)].map((_, index) => (
            <Page key={index} pageNumber={index + 1} />
          ))}
        </Document>
      </div>
    </div>
  );
};

export default Plan;
