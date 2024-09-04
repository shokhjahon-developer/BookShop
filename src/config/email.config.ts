interface EmailOptions {
  host: string;
  port: string;
  user: string;
  pass: string;
}

export const emailConfig: EmailOptions = {
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
};
