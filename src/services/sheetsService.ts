import { SHEETS_CONFIG } from '../config/sheets';

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  interestType: string;
  message: string;
}

interface GoogleOAuthResponse {
  access_token?: string;
  error?: string;
}

const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';

export const sheetsService = {
  async getAuthToken() {
    try {
      console.log('Initializing OAuth client...');
      console.log('Client ID:', import.meta.env.VITE_GOOGLE_CLIENT_ID);
      
      return new Promise<string>((resolve, reject) => {
        if (!window.google?.accounts?.oauth2) {
          console.error('Google OAuth not loaded');
          reject(new Error('Google OAuth not loaded. Please refresh the page.'));
          return;
        }

        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          scope: SCOPES,
          callback: (response: GoogleOAuthResponse) => {
            console.log('OAuth callback received:', response);
            if (response.error) {
              console.error('Auth error:', response.error);
              reject(new Error(`Authentication failed: ${response.error}`));
            } else if (response.access_token) {
              console.log('Auth successful, token received');
              resolve(response.access_token);
            } else {
              reject(new Error('No access token received'));
            }
          },
          prompt: 'none',
          access_type: 'offline',
          hint: window.location.origin,
        });

        console.log('Requesting access token...');
        client.requestAccessToken();
      });
    } catch (error) {
      console.error('Auth setup error:', error);
      throw error;
    }
  },

  async submitForm(formData: FormData) {
    try {
      console.log('Starting form submission...');
      const token = await this.getAuthToken();
      console.log('Auth token received');

      // Get the last submission ID to generate the next one
      console.log('Fetching existing data...');
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEETS_CONFIG.spreadsheetId}/values/${SHEETS_CONFIG.range}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Sheets API error:', errorData);
        throw new Error(`Failed to fetch sheet data: ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      console.log('Existing data fetched successfully');
      const rows = data.values || [];
      
      // Generate new submission ID
      const lastId = rows.length > 1 ? parseInt(rows[rows.length - 1][0]) : 0;
      const newId = (lastId + 1).toString().padStart(4, '0');
      
      // Prepare new row data
      const newRow = [
        newId,
        new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
        formData.fullName,
        formData.phone,
        formData.email,
        formData.interestType,
        formData.message,
        'Not yet',
        'Pending',
        ''
      ];

      console.log('Appending new row...');
      // Append the new row
      const appendResponse = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEETS_CONFIG.spreadsheetId}/values/${SHEETS_CONFIG.range}:append?valueInputOption=USER_ENTERED`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            values: [newRow]
          })
        }
      );

      if (!appendResponse.ok) {
        const errorData = await appendResponse.json();
        console.error('Append error:', errorData);
        throw new Error(`Failed to append data: ${errorData.error?.message || appendResponse.statusText}`);
      }

      console.log('Form submitted successfully');
      return { success: true, submissionId: newId };
    } catch (error) {
      console.error('Error in submitForm:', error);
      throw error;
    }
  }
}; 