import multer from 'multer';
import path from 'path';
import fs from 'fs';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  // Accept images and PDFs
  if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only images and PDF files are allowed'), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

export class FileUploadService {
  static async processUploadedFile(file: Express.Multer.File, category: string): Promise<{
    fileName: string;
    fileType: string;
    fileSize: number;
    extractedData?: any;
  }> {
    // Mock OCR/text extraction
    const extractedData = await this.extractDataFromFile(file, category);
    
    return {
      fileName: file.filename,
      fileType: file.mimetype,
      fileSize: file.size,
      extractedData,
    };
  }

  private static async extractDataFromFile(file: Express.Multer.File, category: string): Promise<any> {
    // Mock data extraction - in real app, you'd use OCR service
    const mockData: Record<string, any> = {
      work: {
        vendor: 'Kontorsmaterial AB',
        amount: 2499,
        date: new Date('2024-01-15'),
        category: 'work',
        description: 'Kontorsmaterial för hemmakontor',
      },
      home: {
        vendor: 'IKEA Sverige',
        amount: 3200,
        date: new Date('2024-02-01'),
        category: 'home',
        description: 'Skrivbord och kontorsstol',
      },
      travel: {
        vendor: 'SJ AB',
        amount: 456,
        date: new Date('2024-02-10'),
        category: 'travel',
        description: 'Tågbiljett Stockholm-Göteborg',
      },
      education: {
        vendor: 'Coursera Sverige',
        amount: 599,
        date: new Date('2024-03-01'),
        category: 'education',
        description: 'Kursprenumeration professionell utveckling',
      },
      medical: {
        vendor: 'Apoteket AB',
        amount: 280,
        date: new Date('2024-01-20'),
        category: 'medical',
        description: 'Receptbelagd medicin',
      },
      charity: {
        vendor: 'Röda Korset',
        amount: 500,
        date: new Date('2024-03-15'),
        category: 'charity',
        description: 'Donation välgörenhet',
      },
      default: {
        vendor: 'Okänd leverantör',
        amount: Math.floor(Math.random() * 1000) + 100,
        date: new Date(),
        category,
        description: 'Kvitto för ' + category,
      },
    };

    return mockData[category] || mockData.default;
  }

  static async deleteFile(fileName: string): Promise<void> {
    const filePath = path.join(UPLOAD_DIR, fileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
}