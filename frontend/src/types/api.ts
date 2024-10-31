// 型定義を集約
export interface PDFPage {
  content: string;
  page: number;
  contentLength: number;
}

export interface APIResponse {
  result: {
    pages: PDFPage[];
    completionTime: number;
    fileName: string;
    inputTokens: number;
    outputTokens: number;
  };
} 