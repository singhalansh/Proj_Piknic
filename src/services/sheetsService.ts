import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import dotenv from 'dotenv';
dotenv.config();


const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const SPREADSHEET_ID = '1-MUvXRuHy-lH0Z7rAwTZ2ONGfSoTdWzOvG4MZSKK_Xk';
const SHEET_NAME = 'Sheet1';

// Function to properly format the private key
const formatPrivateKey = (key: string) => {
  if (!key) {
    throw new Error('Google Service Account key is not set');
  }
  return key.replace(/\\n/g, '\n');
};

// Initialize the JWT client
let auth: JWT;
try {
  const privateKey = formatPrivateKey(process.env.GOOGLE_SERVICE_ACCOUNT_KEY || '');
  auth = new JWT({
    email: 'picknik@picknik-463019.iam.gserviceaccount.com',
    key: privateKey,
    scopes: SCOPES,
  });
} catch (error) {
  console.error('Failed to initialize Google Sheets auth:', error);
  throw new Error('Failed to initialize Google Sheets authentication');
}

const sheets = google.sheets({ version: 'v4', auth });

export interface FormSubmission {
  fullName: string;
  phone: string;
  email: string;
  interestType: string;
  message: string;
}

interface GoogleSheetsError extends Error {
  response?: {
    data?: {
      error?: {
        message?: string;
        status?: string;
        code?: number;
      };
    };
  };
}

export const sheetsService = {
  async submitForm(data: FormSubmission) {
    try {
      console.log('Initializing Google Sheets submission...');
      
      // Validate required fields
      if (!data.fullName || !data.phone || !data.email || !data.interestType || !data.message) {
        throw new Error('All fields are required');
      }

      const now = new Date();
      const submissionId = `SUB-${Date.now()}`;
      
      const values = [
        [
          submissionId,
          now.toLocaleDateString(),
          now.toLocaleTimeString(),
          data.fullName,
          data.phone,
          data.email,
          data.interestType,
          data.message,
          'Website Form',
          'Pending',
          ''
        ]
      ];

      console.log('Attempting to append values to sheet:', {
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A:K`,
        values
      });

      // First, verify the sheet exists and is accessible
      try {
        const sheetResponse = await sheets.spreadsheets.get({
          spreadsheetId: SPREADSHEET_ID,
        });
        console.log('Successfully accessed spreadsheet:', sheetResponse.data);
      } catch (error) {
        console.error('Error accessing spreadsheet:', error);
        throw new Error('Could not access the spreadsheet. Please check the spreadsheet ID and permissions.');
      }

      // Then append the values
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A:K`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values,
        },
      });

      console.log('Successfully appended to sheet:', response.data);

      return { success: true, submissionId };
    } catch (error: unknown) {
      console.error('Detailed Google Sheets error:', error);
      
      const sheetsError = error as GoogleSheetsError;
      
      // Check for specific Google Sheets API errors
      if (sheetsError.response?.data?.error) {
        const apiError = sheetsError.response.data.error;
        console.error('Google Sheets API Error:', {
          message: apiError.message,
          status: apiError.status,
          code: apiError.code
        });
        return { 
          success: false, 
          error: `Google Sheets API Error: ${apiError.message || 'Unknown API error'} (Status: ${apiError.status}, Code: ${apiError.code})`
        };
      }

      // Check for authentication errors
      if (sheetsError.message?.includes('invalid_grant')) {
        return { 
          success: false, 
          error: 'Authentication failed: Invalid credentials. Please check the service account key.'
        };
      }

      // Check for permission errors
      if (sheetsError.message?.includes('permission')) {
        return { 
          success: false, 
          error: 'Permission denied: Please check if the service account has edit access to the spreadsheet.'
        };
      }

      return { 
        success: false, 
        error: sheetsError instanceof Error ? sheetsError.message : 'Unknown error occurred'
      };
    }
  }
}; 