import express from 'express';
import cors from 'cors';
import { google } from 'googleapis';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { z } from 'zod';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
const SPREADSHEET_ID = process.env.SPREADSHEET_ID || '1-MUvXRuHy-lH0Z7rAwTZ2ONGfSoTdWzOvG4MZSKK_Xk';
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:5173'];

// Load service account credentials
const serviceAccount = JSON.parse(
  readFileSync(join(__dirname, 'src/config/service-account.json'), 'utf8')
);

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['POST'],
  allowedHeaders: ['Content-Type']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

app.use(express.json());

// Input validation schema
const formSchema = z.object({
  fullName: z.string().min(2).max(100),
  phone: z.string().regex(/^\+?[\d\s-]{10,}$/),
  email: z.string().email(),
  interestType: z.string().min(1),
  message: z.string().min(1).max(1000)
});

// Initialize Google Sheets API
const auth = new google.auth.JWT({
  email: serviceAccount.client_email,
  key: serviceAccount.private_key,
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

const sheets = google.sheets({ version: 'v4', auth });

// Test the connection on startup
async function testConnection() {
  try {
    await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID
    });
    console.log('Successfully connected to Google Sheets API');
  } catch (error) {
    console.error('Failed to connect to Google Sheets API:', error.message);
    if (error.message.includes('unregistered callers')) {
      console.error('\nPlease make sure to:');
      console.error('1. Enable the Google Sheets API in your Google Cloud Console');
      console.error('2. Share your spreadsheet with the service account email:', serviceAccount.client_email);
    }
    process.exit(1);
  }
}

app.post('/api/submit-form', async (req, res) => {
  try {
    // Validate input
    const validatedData = formSchema.parse(req.body);
    const { fullName, phone, email, interestType, message } = validatedData;

    // Get existing data to generate new ID
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:J',
    });

    const rows = response.data.values || [];
    const lastId = rows.length > 1 ? parseInt(rows[rows.length - 1][0]) : 0;
    const newId = (lastId + 1).toString().padStart(4, '0');

    // Prepare new row
    const newRow = [
      newId,
      new Date().toISOString().split('T')[0],
      fullName,
      phone,
      email,
      interestType,
      message,
      'Not yet',
      'Pending',
      ''
    ];

    // Append the new row
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:J',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [newRow]
      }
    });

    res.json({ success: true, submissionId: newId });
  } catch (error) {
    console.error('Error submitting form:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Invalid input data',
        details: error.errors
      });
    }

    res.status(500).json({ 
      success: false, 
      error: 'An unexpected error occurred. Please try again later.'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'An unexpected error occurred. Please try again later.'
  });
});

const PORT = process.env.PORT || 3000;

// Test the connection before starting the server
testConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});