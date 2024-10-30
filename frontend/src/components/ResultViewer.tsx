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
    <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
      <div className="relative">
        <button
          onClick={handleCopy}
          className={`
            absolute top-2 right-2 px-3 py-1 rounded text-sm
            ${copied 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-200 hover:bg-gray-300'}
          `}
        >
          {copied ? "コピーしました！" : "コピー"}
        </button>
        <div className="prose prose-sm max-w-none pt-8">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            className="font-mono text-sm leading-relaxed"
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
} 