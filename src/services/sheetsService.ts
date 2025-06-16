interface FormData {
  fullName: string;
  phone: string;
  email: string;
  interestType: string;
  message: string;
}

export const sheetsService = {
  async submitForm(formData: FormData) {
    try {
      console.log('Starting form submission...');
      
      const apiUrl = process.env.NODE_ENV === 'production' 
        ? 'https://picknikb.vercel.app/api/submit-form'
        : 'http://localhost:3000/api/submit-form';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        console.error('Failed to parse error response:', e);
        throw new Error('Server returned an invalid response');
      }

      if (!response.ok) {
        console.error('Form submission error:', errorData);
        throw new Error(errorData.error || 'Failed to submit form');
      }

      console.log('Form submitted successfully');
      return errorData;
    } catch (error) {
      console.error('Error in submitForm:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  }
}; 