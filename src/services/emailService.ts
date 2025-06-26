import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: 'bcah dquk gbny qbzt',
  },
});

export interface EmailData {
  submissionId: string;
  fullName: string;
  phone: string;
  email: string;
  interestType: string;
  message: string;
}

export const emailService = {
  async sendNotification(data: EmailData) {
    try {
      console.log('Initializing email notification...');
      console.log('Email configuration:', {
        user: process.env.EMAIL_USER,
        hasPassword: !!process.env.EMAIL_PASSWORD
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'urvashi16may@gmail.com',
        subject: `New Form Submission - ${data.submissionId}`,
        html: `
          <h2>New Form Submission</h2>
          <p><strong>Submission ID:</strong> ${data.submissionId}</p>
          <p><strong>Name:</strong> ${data.fullName}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Interest Type:</strong> ${data.interestType}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message}</p>
        `,
      };

      console.log('Attempting to send email with options:', {
        from: mailOptions.from,
        to: mailOptions.to,
        subject: mailOptions.subject
      });

      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info);
      return { success: true };
    } catch (error) {
      console.error('Detailed email error:', error);
      if (error instanceof Error) {
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      return { success: false, error: 'Failed to send email notification' };
    }
  }
}; 