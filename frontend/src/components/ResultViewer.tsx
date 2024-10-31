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
    <div className="viewer-container">
      <div className="viewer-header">
        <h3 className="text-sm font-medium text-gray-700">
          処理結果
        </h3>
        <button
          onClick={handleCopy}
          className={`
            px-3 py-1 rounded text-sm font-medium transition-colors
            ${copied 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}
          `}
        >
          {copied ? "コピーしました！" : "コピー"}
        </button>
      </div>
      <div className="viewer-content">
        <div className="markdown-content">
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