import multer from "multer";
import { Request } from "express";
import { config } from "../config";

const storage = multer.diskStorage({
  destination: config.upload.destination,
  filename: (req: Request, file: Express.Multer.File, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    callback(null, uniqueSuffix + '-' + file.originalname);
  }
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback
) => {
  if (config.upload.allowedTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(new Error('PDFファイルのみアップロード可能です。'));
  }
};

export const upload = multer({ 
  storage,
  fileFilter,
  limits: {
    fileSize: config.upload.maxFileSize
  }
}); 