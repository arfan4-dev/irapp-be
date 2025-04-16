import dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';

export const sendEmail = async ({
  to,
  subject,
  html,
  text,
}) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: `"Shiki" <${process.env.EMAIL}>`,
    to,
    subject,
    text,
    html,
  };

  // Await send without try/catch — error will bubble up
  await transporter.sendMail(mailOptions);
};
