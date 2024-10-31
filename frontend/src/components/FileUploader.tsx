'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileUploaderProps {
  onUpload: (file: File) => void;
  loading: boolean;
}

export function FileUploader({ onUpload, loading }: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type === 'application/pdf') {
      onUpload(file);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false
  });

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-xl p-8
          transition-all duration-200 min-h-[200px]
          flex flex-col items-center justify-center gap-4
          ${isDragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'}
        `}
      >
        <input {...getInputProps()} />
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-gray-600 mb-2">
            PDFファイルをドラッグ＆ドロップするか、クリックして選択してください
          </p>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            ファイルを選択
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center p-4 bg-blue-50 rounded-xl">
          <div className="flex items-center space-x-3">
            <svg className="animate-spin h-5 w-5 text-blue-500" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="text-blue-700 font-medium">処理中...</span>
          </div>
        </div>
      )}
    </div>
  );
} 