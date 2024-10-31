import dotenv from 'dotenv';

// 環境変数を読み込む
dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not set in environment variables');
}

export const config = {
  server: {
    port: process.env.PORT || 4000,
    cors: {
      origin: ['http://localhost:3000'],
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type'],
      credentials: true
    }
  },
  upload: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['application/pdf'],
    destination: 'uploads/'
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY
  }
}; 