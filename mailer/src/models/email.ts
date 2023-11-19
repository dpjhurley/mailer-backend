import nodemailer from "nodemailer";
import pug from "pug";
import path from "path";
import config from "../config";

const { smtpMailtrapSandbox: smtp } = config;

export interface EmailInput {
  from: string;
  to: string;
  subject: string;
  body: string;
}

export default class Email {
  private from: string;
  private to: string;
  private subject: string;
  private body: string;

  constructor({ from, to, subject, body }: EmailInput) {
    this.from = from;
    this.to = to;
    this.subject = subject;
    this.body = body;
  }

  private createTransporter() {
    const transport = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: false,
      auth: {
        user: smtp.user,
        pass: smtp.password
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
      from: this.from,
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
