'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ResultViewerProps {
  content: string;
}

export function ResultViewer({ content }: ResultViewerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-[calc(100vh-300px)] bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gray-100 px-4 py-2 border-b flex justify-between items-center sticky top-0 z-10">
        <h3 className="text-sm font-medium text-gray-700">
          処理結果
        </h3>
        <button
          onClick={handleCopy}
          className={`
            px-3 py-1 rounded text-sm
            ${copied 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-200 hover:bg-gray-300'}
          `}
        >
          {copied ? "コピーしました！" : "コピー"}
        </button>
      </div>
      <div className="h-[calc(100%-40px)] overflow-auto">
        <div className="p-6">
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              className="font-mono text-sm leading-relaxed"
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
} 