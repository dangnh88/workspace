// ルーティングを分離
import { Router } from "express";
import { PDFController } from "../controllers/pdf.controller";
import { upload } from "../middleware/upload";

const router = Router();

router.post('/process-pdf', 
  upload.single('file'),
  PDFController.processPDF
);

export const pdfRoutes = router; 