import { useState } from 'react';
import { pdfService } from '../services/api';

export function usePDFProcessor() {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  const processPDF = async (file: File) => {
    setLoading(true);
    setError(null);
    setCurrentFile(file);
    
    try {
      const data = await pdfService.processPDF(file);
      
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

  return {
    result,
    error,
    loading,
    currentFile,
    processPDF
  };
} 