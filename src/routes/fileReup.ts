import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import ExcelJS, { CellValue } from 'exceljs'; // Import CellValue from exceljs

import { connectDB } from '../../../imp2/backend/config/db';
import { protect } from '../../../imp2/backend/middleware/authMiddleware';
import { Index } from 'typeorm';

const router = express.Router();
const app = express();
app.use(express.json());

interface File extends Express.Multer.File {
  docid: string;
  doctype: string;
}

const storage = multer.diskStorage({
  destination: function (req, file: File, cb: (error: Error | null, destination: string) => void) {
    cb(null, 'uploadXl/');
  },
  filename: function (req, file: File, cb: (error: Error | null, filename: string) => void) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.originalname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post('/', upload.array('files'), uploadFiles);

async function uploadFiles(req: Request, res: Response) {
  const files = req.files as File[];

  const fileData = files.map(file => [
    file.filename,
    file.originalname,
    req.body.docid,
    req.body.doctype
  ]);

  try {
    const __dirname = path.resolve();
    const uploadedFilePath = path.join(__dirname, 'uploadXl/', files[0].filename);
    console.log(uploadedFilePath);

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(uploadedFilePath);
    const sheet = workbook.getWorksheet(1);
    const sheetData: any[] = [];

    const columnIndexes: { [key: string]: number } = {
      code: -1,
      qty: -1,
      price: -1
    };

    sheet.eachRow({ includeEmpty: false }, (row) => {
      if (columnIndexes.code === -1) {
        (row.values as CellValue[]).forEach((header, index) => {
          if (header === 'code') {
            columnIndexes.code = index;
          } else if (header === 'qty') {
            columnIndexes.qty = index;
          } else if (header === 'price') {
            columnIndexes.price = index;
          }
        });
      } else {
        const rowData = row.values as CellValue[];
        const dataObject: any = {
          code: rowData[columnIndexes.code],
          qty: rowData[columnIndexes.qty],
          price: rowData[columnIndexes.price]
        };
        sheetData.push(dataObject);
      }
    });

    console.log(sheetData);

    res.json({
      entries: sheetData,
    });
  } catch (error) {
    console.error('Error reading Excel file:', error);
  }
}

export default router;
