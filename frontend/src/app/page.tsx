'use client';

import React, { useState } from 'react';
import { FileUploader } from '@/components/FileUploader';
import { ResultViewer } from '@/components/ResultViewer';

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

  const handleUpload = async (file: File) => {
    setLoading(true);
    setError(null);
    
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
      
      // 全ページのコンテンツを結合
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
    <main className="min-h-screen p-8 max-w-4xl mx-auto bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">PDF Processor</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <FileUploader 
          onUpload={handleUpload}
          loading={loading}
        />

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        {result && (
          <ResultViewer content={result} />
        )}
      </div>
    </main>
  );
} 