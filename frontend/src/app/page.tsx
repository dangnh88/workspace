'use client';

import React, { useState } from 'react';
import { FileUploader } from '@/components/FileUploader';
import { ResultViewer } from '@/components/ResultViewer';
import { PDFViewer } from '@/components/PDFViewer';

interface APIResponse {
  result: {
    pages: Array<{
      content: string;
      page: number;
      contentLength: number;
    }>;
    completionTime: number;
    fileName: string;
    inputTokens: number;
    outputTokens: number;
  };
}

export default function Home() {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  const handleUpload = async (file: File) => {
    setLoading(true);
    setError(null);
    setCurrentFile(file);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:4000/process-pdf', {
        method: 'POST',
        body: formData,
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: APIResponse = await response.json();
      
      if (data.result?.pages) {
        const allContent = data.result.pages
          .sort((a, b) => a.page - b.page)
          .map(page => page.content)
          .join('\n\n---\n\n');
        setResult(allContent);
      } else {
        setError('PDFの処理結果が見つかりませんでした。');
      }
    } catch (err) {
      console.error('API Error:', err);
      setError('サーバーとの通信に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="glass-container rounded-2xl p-6 mb-8">
            <FileUploader 
              onUpload={handleUpload}
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
        </div>
      </main>
    </div>
  );
} 