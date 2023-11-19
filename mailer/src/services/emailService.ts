import * as grpc from "@grpc/grpc-js";
import { Email__Output } from "../../generated/email/Email";
import { SendEmailResponse } from "../../generated/email/SendEmailResponse";
import Email from "../models/Email";

export const sendEmail = async (
  call: grpc.ServerUnaryCall<Email__Output, SendEmailResponse>,
  callback: grpc.sendUnaryData<SendEmailResponse>
): Promise<void> => {
  try {
    const emailInput: Email__Output = {
      from: call.request.from,
      to: call.request.to,
      subject: call.request.subject,
      body: call.request.body
    };

    await new Email(emailInput).sendEmail();

    callback(null, {
      success: true,
      message: "Email sent successfully"
    });
  } catch (err) {
    callback(null, {
      success: false,
      message: `Failed to send email, ${err}`
    });
  }
};
