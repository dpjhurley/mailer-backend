import nodemailer from "nodemailer";
import pug from "pug";
import path from "path";
import config from "../config";

const { smtpHost, smtpPort, smtpPassword, smtpUser } = config;

export interface EmailInput {
  cc: string;
  to: string;
  subject: string;
  body: string;
}

export default class Email {
  private cc: string;
  private to: string;
  private subject: string;
  private body: string;

  constructor({ cc, to, subject, body }: EmailInput) {
    this.cc = cc;
    this.to = to;
    this.subject = subject;
    this.body = body;
  }

  private createTransporter() {
    const transport = nodemailer.createTransport({
      host: smtpHost,
      port: Number(smtpPort),
      secure: false,
      auth: {
        user: smtpUser,
        pass: smtpPassword
      }
    });

    return transport;
  }

  private createEmail() {
    const compiledHtml = pug.renderFile(
      path.resolve(__dirname, "../templates/emailTemplate.pug"),
      {
        subject: this.subject,
        body: this.body
      }
    );

    return {
      cc: this.cc,
      to: this.to,
      subject: this.subject,
      html: compiledHtml
    };
  }

  public async sendEmail() {
    try {
      const mailOptions = this.createEmail();
      const transporter = this.createTransporter();

      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
    } catch (err) {
      console.log({ err }, "Error thrown from nodemailer");
      throw err;
    }
  }
}
