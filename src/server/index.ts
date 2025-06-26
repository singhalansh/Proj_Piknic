import express from 'express';
import cors from 'cors';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { sheetsService } from '../services/sheetsService';
import { emailService } from '../services/emailService';

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = [
  'EMAIL_USER',
  'EMAIL_PASSWORD',
  'GOOGLE_SERVICE_ACCOUNT_KEY'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars);
  process.exit(1);
}

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Google Sheets setup
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const SPREADSHEET_ID = '1-MUvXRuHy-lH0Z7rAwTZ2ONGfSoTdWzOvG4MZSKK_Xk';
const SHEET_NAME = 'Sheet1';

// Initialize the JWT client
const auth = new JWT({
  email: 'picknik@picknik-463019.iam.gserviceaccount.com',
  key: process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
  scopes: SCOPES,
});

const sheets = google.sheets({ version: 'v4', auth });

// Email setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    env: {
      EMAIL_USER: process.env.EMAIL_USER ? 'Set' : 'Not set',
      EMAIL_PASSWORD: process.env.EMAIL_PASSWORD ? 'Set' : 'Not set',
      GOOGLE_SERVICE_ACCOUNT_KEY: process.env.GOOGLE_SERVICE_ACCOUNT_KEY ? 'Set' : 'Not set'
    }
  });
});

// API endpoint for form submission
app.post('/api/submit-form', async (req, res) => {
  try {
    const { fullName, phone, email, interestType, message } = req.body;
    
    // Validate required fields
    if (!fullName || !phone || !email || !interestType || !message) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required'
      });
    }

    console.log('Received form submission:', { fullName, phone, email, interestType, message });

    // Save to Google Sheets
    const sheetsResult = await sheetsService.submitForm({
      fullName,
      phone,
      email,
      interestType,
      message
    });

    if (!sheetsResult.success) {
      console.error('Google Sheets Error:', sheetsResult.error);
      return res.status(500).json({
        success: false,
        error: sheetsResult.error
      });
    }

    // Send email notification
    const emailResult = await emailService.sendNotification({
      submissionId: sheetsResult.submissionId,
      fullName,
      phone,
      email,
      interestType,
      message
    });

    if (!emailResult.success) {
      console.error('Email Error:', emailResult.error);
      // Don't return error here since the form was saved successfully
    }

    res.json({ success: true, submissionId: sheetsResult.submissionId });
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to process form submission: ' + (error instanceof Error ? error.message : 'Unknown error')
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log('Environment variables loaded:', {
    EMAIL_USER: process.env.EMAIL_USER ? 'Set' : 'Not set',
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD ? 'Set' : 'Not set',
    GOOGLE_SERVICE_ACCOUNT_KEY: process.env.GOOGLE_SERVICE_ACCOUNT_KEY ? 'Set' : 'Not set'
  });
}); 