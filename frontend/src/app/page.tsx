'use client';

import { useState } from 'react';
import { FileUploader } from '@/components/FileUploader';
import { ResultViewer } from '@/components/ResultViewer';

export default function Home() {
  const [result, setResult] = useState<any>(null);
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
      });
      const data = await response.json();
      
      if (response.ok) {
        setResult(data.result);
      } else {
        setError(data.error || 'エラーが発生しました。');
      }
    } catch (err) {
      setError('サーバーとの通信に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">PDF Processor</h1>
      
      <FileUploader 
        onUpload={handleUpload}
        loading={loading}
      />

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {result && (
        <ResultViewer result={result} />
      )}
    </main>
  );
} 