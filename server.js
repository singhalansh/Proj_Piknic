import express from 'express';
import cors from 'cors';
import { google } from 'googleapis';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serviceAccount = JSON.parse(
  readFileSync(join(__dirname, 'src/config/service-account.json'), 'utf8')
);

const app = express();
app.use(cors());
app.use(express.json());

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
      spreadsheetId: '1-MUvXRuHy-lH0Z7rAwTZ2ONGfSoTdWzOvG4MZSKK_Xk'
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
    const { fullName, phone, email, interestType, message } = req.body;

    // Get existing data to generate new ID
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: '1-MUvXRuHy-lH0Z7rAwTZ2ONGfSoTdWzOvG4MZSKK_Xk',
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
      spreadsheetId: '1-MUvXRuHy-lH0Z7rAwTZ2ONGfSoTdWzOvG4MZSKK_Xk',
      range: 'Sheet1!A:J',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [newRow]
      }
    });

    res.json({ success: true, submissionId: newId });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to submit form' 
    });
  }
});

const PORT = process.env.PORT || 3000;

// Test the connection before starting the server
testConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});