import { emailConfig } from '@config';
import * as nodemailer from 'nodemailer';

const configOptions = {
  host: emailConfig.host,
  port: +emailConfig.port,

  auth: {
    user: emailConfig.user,
    pass: emailConfig.pass,
  },
};

const transporter = nodemailer.createTransport(configOptions);

async function sendMail(to: string, code: string): Promise<void> {
  const mailOptions = {
    from: 'Readify 📚 <no-reply@stanfordacademy.com>',
    to,
    subject: 'Your Verification Code ✔',
    text: `Your verification code is: ${code}`,
    html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; border: 1px solid #dddddd; box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background-color: #007bff; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Your Verification Code</h1>
          </div>
          
          <!-- Body -->
          <div style="padding: 30px; background-color: #f4f4f4;">
            <p style="font-size: 16px; color: #333333; line-height: 1.6; text-align: center;">Hello!</p>
            <p style="font-size: 16px; color: #333333; line-height: 1.6; text-align: center;">Thank you for registering with Readify 📚. To complete your registration, please use the following verification code:</p>
  
            <div style="font-size: 32px; font-weight: bold; color: #007bff; text-align: center; margin: 20px 0;">
              ${code}
            </div>
  
            <p style="font-size: 14px; color: #666666; text-align: center;">If you did not request this code, please ignore this email.</p>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #007bff; padding: 15px; border-radius: 0 0 10px 10px; text-align: center;">
            <p style="color: #ffffff; font-size: 12px; margin: 0;">Readify 📚 | Empowering Your Learning Journey</p>
            <p style="color: #ffffff; font-size: 12px; margin: 0;">© ${new Date().getFullYear()} Readify. All rights reserved.</p>
          </div>
        </div>
      `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${to}`);
  } catch (error) {
    console.error(`Error sending email to ${to}: ${error.message}`);
    throw error;
  }
}

export default sendMail;
