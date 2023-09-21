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
      price: -1,
      description: -1,
      remark: -1,
      test1: -1,
      test2: -1,
      test3: -1,
      test4: -1,
      test5: -1,
      test6: -1,
      test7: -1,
      test8: -1,
      test9: -1,
      test10: -1,
      test11: -1,
      test12: -1,
      test13: -1,
      test14: -1,
      test15: -1,
      test16: -1,
      test17: -1,
      test18: -1,
      test19: -1,
      test20: -1,
      test21: -1,
      test22: -1,
      
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
          }else if (header === 'description') {
            columnIndexes.description = index;
          }else if (header === 'remark') {
            columnIndexes.remark = index;
          }else if (header === 'test1') {
            columnIndexes.test1 = index;
          }else if (header === 'test2') {
            columnIndexes.test2 = index;
          }else if (header === 'test3') {
            columnIndexes.test3 = index;
          }else if (header === 'test4') {
            columnIndexes.test4 = index;
          }else if (header === 'test5') {
            columnIndexes.test5 = index;
          }else if (header === 'test6') {
            columnIndexes.test6 = index;
          }else if (header === 'test7') {
            columnIndexes.test7 = index;
          }else if (header === 'test8') {
            columnIndexes.test8 = index;
          }else if (header === 'test9') {
            columnIndexes.test9 = index;
          }else if (header === 'test10') {
            columnIndexes.test10 = index;
          }else if (header === 'test11') {
            columnIndexes.test11 = index;
          }else if (header === 'test12') {
            columnIndexes.test12 = index;
          }else if (header === 'test13') {
            columnIndexes.test13 = index;
          }else if (header === 'test14') {
            columnIndexes.test14 = index;
          }else if (header === 'test15') {
            columnIndexes.test15 = index;
          }else if (header === 'test16') {
            columnIndexes.test16 = index;
          }else if (header === 'test17') {
            columnIndexes.test17 = index;
          }else if (header === 'test18') {
            columnIndexes.test18 = index;
          }else if (header === 'test19') {
            columnIndexes.test19 = index;
          }else if (header === 'test20') {
            columnIndexes.test20 = index;
          }else if (header === 'test21') {
            columnIndexes.test21 = index;
          }else if (header === 'test22') {
            columnIndexes.test22 = index;
          }
          
        });
      } else {
        const rowData = row.values as CellValue[];
        


       
        const dataObject: any = {
          code: rowData[columnIndexes.code],
          qty: rowData[columnIndexes.qty],
          price: rowData[columnIndexes.price],
          description: rowData[columnIndexes.description],
          remark: rowData[columnIndexes.remark],
          test1: rowData[columnIndexes.test1],
          test2: rowData[columnIndexes.test2],
          test3: rowData[columnIndexes.test3],
          test4: rowData[columnIndexes.test4],
          test5: rowData[columnIndexes.test5],
          test6: rowData[columnIndexes.test6],
          test7: rowData[columnIndexes.test7],
          test8: rowData[columnIndexes.test8],
          test9: rowData[columnIndexes.test9],
          test10: rowData[columnIndexes.test10],
          test11: rowData[columnIndexes.test11],
          test12: rowData[columnIndexes.test12],
          test13: rowData[columnIndexes.test13],
          test14: rowData[columnIndexes.test14],
          test15: rowData[columnIndexes.test15],
          test16: rowData[columnIndexes.test16],
          test17: rowData[columnIndexes.test17],
          test18: rowData[columnIndexes.test18],
          test19: rowData[columnIndexes.test19],
          test20: rowData[columnIndexes.test20],
          test21: rowData[columnIndexes.test21],
          test22: rowData[columnIndexes.test22],

        };
        sheetData.push(dataObject);

      //
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
