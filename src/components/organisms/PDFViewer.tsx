"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight, Download, Loader2 } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface PDFViewerProps {
  fileUrl: string;
  fileName: string;
}

export default function PDFViewer({ fileUrl, fileName }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<number>(0);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
    setLoading(false);
  }

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const calculateScale = () => {
    const availableWidth = containerWidth - 48;
    const availableHeight = containerHeight - 32;
    return Math.min(availableWidth, availableHeight);
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-none p-4 bg-header-gradient border-b border-indigo-100 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-indigo-900 truncate">
          {fileName}
        </h2>
        <button
          onClick={handleDownload}
          className="flex items-center space-x-2 px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          <Download size={16} />
          <span>Download</span>
        </button>
      </div>
      <div
        className="flex-1 overflow-auto bg-gray-100 min-h-0 p-6"
        ref={(ref) => {
          if (ref) {
            setContainerWidth(ref.clientWidth);
            setContainerHeight(ref.clientHeight);
          }
        }}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          </div>
        )}
        <Document
          file={fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex justify-center p-4">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
          }
          className="flex items-center justify-center min-h-full"
        >
          <Page
            pageNumber={pageNumber}
            width={calculateScale()}
            className="shadow-lg"
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>
      <div className="flex-none flex items-center justify-between p-4 bg-white border-t">
        <button
          onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
          disabled={pageNumber <= 1}
          className="p-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <p className="text-sm text-gray-700 font-medium">
          Page {pageNumber} of {numPages || "..."}
        </p>
        <button
          onClick={() =>
            setPageNumber((prev) => Math.min(prev + 1, numPages || 1))
          }
          disabled={pageNumber >= (numPages || 1)}
          className="p-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
