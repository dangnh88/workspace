// PDFの処理ロジックを分離
import { Request, Response } from "express";
import { zerox } from "zerox";
import { config } from "../config";

export interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export class PDFController {
  static async processPDF(req: MulterRequest, res: Response): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).json({ error: 'ファイルがアップロードされていません。' });
        return;
      }

      const result = await zerox({
        filePath: req.file.path,
        openaiAPIKey: config.openai.apiKey
      });

      res.json({ result });
    } catch (error) {
      console.error('Error processing PDF:', error);
      res.status(500).json({ error: '処理中にエラーが発生しました。' });
    }
  }
} 