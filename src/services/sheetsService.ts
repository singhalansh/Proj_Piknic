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

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Form submission error:', errorData);
        throw new Error(errorData.error || 'Failed to submit form');
      }

      const result = await response.json();
      console.log('Form submitted successfully');
      return result;
    } catch (error) {
      console.error('Error in submitForm:', error);
      throw error;
    }
  }
}; 