import { Request, Response } from "express";
import { Email } from "../../generated/email/Email";
import { SendEmailResponse__Output } from "../../generated/email/SendEmailResponse";
import { ServiceError } from "@grpc/grpc-js";

export interface MailController {
  sendMail: void;
}

export interface SendMailRequest extends Request {
  body: Email;
}

export const getMailController = (grpcClient: any) => ({
  sendEmail: (req: SendMailRequest, res: Response) => {
    const emailInputs: Email = req.body;

    grpcClient.SendEmail(
      {
        to: emailInputs.to,
        from: emailInputs.from,
        subject: emailInputs.subject,
        body: emailInputs.body
      },
      (err: ServiceError, response: SendEmailResponse__Output | undefined) => {
        if (err || !response) {
          res.status(500).send("Internal Server Error");
          return;
        }

        if (!response.success) {
          res.status(400).send(response.message);
          return;
        }

        res.status(200).send({
          success: response.success,
          message: response.message
        });
      }
    );
  }
});
