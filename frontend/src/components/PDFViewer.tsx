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
    
    // Cleanup on unmount
    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <div className="h-[calc(100vh-300px)] bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gray-100 px-4 py-2 border-b sticky top-0 z-10">
        <h3 className="text-sm font-medium text-gray-700">
          元のPDF: {file.name}
        </h3>
      </div>
      <div className="h-[calc(100%-40px)] overflow-auto">
        <iframe
          src={`${url}#toolbar=0`}
          className="w-full h-full"
          title="PDF preview"
        />
      </div>
    </div>
  );
} 