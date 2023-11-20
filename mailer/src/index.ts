import Nodemailer from "nodemailer";
import ini from "ini";
import fs from "node:fs";

// interface SmtpOptions {
//   host: string;
//   port: string;
//   user: string;
//   pass: string;
// }

const config = ini.parse(fs.readFileSync("../config.ini", "utf-8"));

if (!config.smtp) {
  throw new Error("Missing config for smtp");
}

const { smtpSandbox: smtp } = config;

const transport = Nodemailer.createTransport({
  host: smtp.host,
  port: smtp.port,
  secure: false,
  auth: {
    user: smtp.user,
    pass: smtp.password
  }
});

// this should use pug to create the email from a template
const mailOptions = {
  from: "dpjhurley@gmail.com",
  to: "katka1391@gmail.com",
  subject: "mailer-backend project",
  text: "hello world"
};

transport.sendMail(mailOptions, (err, data) => {
  if (err) {
    console.log("Error " + err);
  } else {
    console.log("Email sent successfully");
  }
});
