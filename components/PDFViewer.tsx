import React from 'react';

interface PDFViewerProps {
  fileUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ fileUrl }) => {
  return (
    <div className="border rounded shadow-lg p-4 mb-4 bg-white overflow-hidden transform transition-transform hover:scale-105">
      <iframe
        src={fileUrl}
        width="100%"
        height="500px"
        className="border rounded-lg shadow-md"
        style={{ minHeight: '400px' }}
      />
    </div>
  );
};

export default PDFViewer;
