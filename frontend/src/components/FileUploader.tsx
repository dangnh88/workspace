'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileUploaderProps {
  onUpload: (file: File) => void;
  loading: boolean;
}

export function FileUploader({ onUpload, loading }: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false
  });

  const handleSubmit = () => {
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-colors duration-200
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
        `}
      >
        <input {...getInputProps()} />
        <p className="text-gray-600">
          PDFファイルをドラッグ＆ドロップするか、クリックして選択してください
        </p>
      </div>

      {file && (
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            選択されたファイル: {file.name}
          </p>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`
              px-4 py-2 rounded-md text-white
              ${loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600'}
            `}
          >
            {loading ? '処理中...' : '処理開始'}
          </button>
        </div>
      )}
    </div>
  );
} 