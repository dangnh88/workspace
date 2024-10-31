import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

import express from "express";
import path from "path";
import cors from 'cors';
import { config } from "./config";
import { pdfRoutes } from "./routes/pdf.routes";

const app = express();

app.use(cors(config.server.cors));
app.use(express.static(path.join(__dirname, '../public')));
app.use(pdfRoutes);

app.listen(config.server.port, () => {
  console.log(`Server is running on port ${config.server.port}`);
});
