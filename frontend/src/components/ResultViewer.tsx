'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ResultViewerProps {
  result: any;
}

export function ResultViewer({ result }: ResultViewerProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async (key: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedField(key);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">処理結果</h2>
      <div className="space-y-6">
        {Object.entries(result).map(([key, value]) => (
          <div key={key} className="border-b border-gray-200 pb-4 last:border-0">
            <div className="font-semibold text-gray-700 mb-2">{key}</div>
            <div className="relative bg-gray-50 rounded-lg p-4">
              {key === 'content' ? (
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    className="font-mono text-sm leading-relaxed"
                  >
                    {value as string}
                  </ReactMarkdown>
                </div>
              ) : (
                <pre className="whitespace-pre-wrap">
                  {JSON.stringify(value, null, 2)}
                </pre>
              )}
              <button
                onClick={() => handleCopy(key, value as string)}
                className={`
                  absolute top-2 right-2 px-3 py-1 rounded text-sm
                  ${copiedField === key 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300'}
                `}
              >
                {copiedField === key ? "コピーしました！" : "コピー"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 