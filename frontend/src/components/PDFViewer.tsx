'use client';

import React from 'react';

interface PDFViewerProps {
  file: File;
}

export function PDFViewer({ file }: PDFViewerProps) {
  const [url, setUrl] = React.useState<string>('');

  React.useEffect(() => {
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    
    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <div className="viewer-container">
      <div className="viewer-header">
        <h3 className="text-sm font-medium text-gray-700">
          元のPDF: {file.name}
        </h3>
      </div>
      <div className="viewer-content">
        <iframe
          src={`${url}#toolbar=0`}
          className="w-full h-full"
          title="PDF preview"
        />
      </div>
    </div>
  );
} 