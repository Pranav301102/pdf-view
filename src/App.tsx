import React, { useEffect, useState } from 'react';
import { Document, Page ,pdfjs} from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import './App.css';
import { PDFDocumentProxy } from 'pdfjs-dist';

const options = {
  cMapUrl: 'cmaps/',
  standardFontDataUrl: 'standard_fonts/',
};

type PDFFile = string | File | null;

export default function App() {
  const [file, setFile] = useState<PDFFile>('./sample.pdf');
  const [file1, setFile1] = useState<PDFFile>('./exp_1.pdf');
  const [numPages, setNumPages] = useState<number>();
  const [numPages1, setNumPages1] = useState<number>();

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }, []);

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;

    if (files && files[0]) {
      setFile(files[0] || null);
    }
  }

  function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy) {
    setNumPages(nextNumPages);
    setNumPages1(nextNumPages);
  }

  return (
    <div className="Example">
      <header>
        <h1>react-pdf sample page</h1>
      </header>
      <div className="Example__container">
        <div className="Example__container__load">
          <label htmlFor="file">Load from file:</label>{' '}
          <input onChange={onFileChange} type="file" />
        </div>
        <div className="Example__container__document">
        <Document file={file1} onLoadSuccess={onDocumentLoadSuccess} options={options}>
            {Array.from(new Array(numPages1), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
}