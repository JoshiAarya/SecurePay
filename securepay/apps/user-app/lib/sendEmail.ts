import nodemailer from "nodemailer";

export const sendEmail = async (to: string, subject: string, content: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const html = `
    <div style="font-family: Arial, sans-serif; padding: 16px;">
      <h2 style="color: #4CAF50;">${subject}</h2>
      <p>${content.replace(/\n/g, "<br>")}</p>
      <hr />
      <small style="color: #888;">This email was sent by SecurePay.</small>
    </div>
  `;

  await transporter.sendMail({
    from: `"SecurePay" <${process.env.MAIL_USER}>`,
    to,
    subject,
    html,
  });
};
