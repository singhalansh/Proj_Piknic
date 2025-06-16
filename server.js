import express from 'express';
import cors from 'cors';
import { google } from 'googleapis';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { z } from 'zod';

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: (origin, callback) => {
    console.log('Request origin:', origin);
    const allowedOrigins = process.env.ALLOWED_ORIGINS 
      ? process.env.ALLOWED_ORIGINS.split(',') 
      : ['http://localhost:5173', 'https://picknikb.vercel.app'];
    console.log('Allowed origins:', allowedOrigins);
    if (!origin || allowedOrigins.includes(origin)) {
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
  windowMs: 15 * 60 * 1000,
  max: 100,
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

// Initialize Google Sheets API with environment variables
const auth = new google.auth.JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

const sheets = google.sheets({ version: 'v4', auth });

// Test the connection on startup
async function testConnection() {
  try {
    console.log('Testing Google Sheets connection...');
    console.log('Service Account Email:', process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
    console.log('Spreadsheet ID:', process.env.SPREADSHEET_ID);
    
    await sheets.spreadsheets.get({
      spreadsheetId: process.env.SPREADSHEET_ID
    });
    console.log('Successfully connected to Google Sheets API');
  } catch (error) {
    console.error('Failed to connect to Google Sheets API:', error.message);
    if (error.message.includes('unregistered callers')) {
      console.error('\nPlease make sure to:');
      console.error('1. Enable the Google Sheets API in your Google Cloud Console');
      console.error('2. Check your environment variables are set correctly');
    }
    process.exit(1);
  }
}

app.post('/api/submit-form', async (req, res) => {
  console.log('Received form submission request');
  try {
    console.log('Request body:', req.body);
    
    // Validate input
    const validatedData = formSchema.parse(req.body);
    console.log('Validated data:', validatedData);
    
    const { fullName, phone, email, interestType, message } = validatedData;

    // Get existing data to generate new ID
    console.log('Fetching existing data from Google Sheets...');
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
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

    console.log('Appending new row to Google Sheets...');
    // Append the new row
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'Sheet1!A:J',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [newRow]
      }
    });

    console.log('Form submitted successfully');
    res.json({ success: true, submissionId: newId });
  } catch (error) {
    console.error('Error submitting form:', error);
    
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
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
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: 'An unexpected error occurred. Please try again later.'
  });
});

// Handle 404 errors
app.use((req, res) => {
  console.log('404 Not Found:', req.url);
  res.status(404).json({
    success: false,
    error: 'Not found'
  });
});

const PORT = process.env.PORT || 3000;

// Test the connection before starting the server
testConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});