import { zerox } from "zerox";
import path from "path";
import express, { Request, Response } from "express";
import multer from "multer";
import dotenv from "dotenv";
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

const app = express();

// CORS設定を追加
app.use(cors());

// 静的ファイルの配信設定を追加
app.use(express.static(path.join(__dirname, '../public')));

// Multerストレージの設定
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) => {
        // オリジナルのファイル名と拡張子を保持
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        callback(null, uniqueSuffix + '-' + file.originalname);
    }
});

// ファイルフィルターの設定
const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    callback: multer.FileFilterCallback
) => {
    // PDFファイルのみを許可
    if (file.mimetype === 'application/pdf') {
        callback(null, true);
    } else {
        callback(new Error('PDFファイルのみアップロード可能です。'));
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB制限
    }
});

interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

// PDFファイル処理用のエンドポイント
app.post('/process-pdf', upload.single('file'), async (req: MulterRequest, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({ error: 'ファイルがアップロードされていません。' });
            return;
        }

        const result = await zerox({
            filePath: req.file.path,
            openaiAPIKey: process.env.OPENAI_API_KEY
        });

        res.json({ result });
    } catch (error) {
        console.error('Error processing PDF:', error);
        res.status(500).json({ error: '処理中にエラーが発生しました。' });
    }
});

// サーバーの起動
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
