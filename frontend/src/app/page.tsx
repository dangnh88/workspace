'use client';

import React from 'react';
import { FileUploader } from '@/components/FileUploader';
import { ResultViewer } from '@/components/ResultViewer';
import { PDFViewer } from '@/components/PDFViewer';
import { usePDFProcessor } from '@/hooks/usePDFProcessor';

export default function Home() {
  const { result, error, loading, currentFile, processPDF } = usePDFProcessor();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="glass-container p-6 mb-8">
          <FileUploader 
            onUpload={processPDF}
            loading={loading}
          />

          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            </div>
          )}
        </div>

        {(currentFile || result) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {currentFile && (
              <div className="gradient-border">
                <PDFViewer file={currentFile} />
              </div>
            )}
            {result && (
              <div className="gradient-border">
                <ResultViewer content={result} />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
} 