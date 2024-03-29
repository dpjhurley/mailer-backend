import * as grpc from "@grpc/grpc-js";
import { Email as EmailInput } from "../../generated/email/Email";
import { SendEmailResponse } from "../../generated/email/SendEmailResponse";
import Email from "../models/Email";

export const sendEmail = async (
  call: grpc.ServerUnaryCall<EmailInput, SendEmailResponse>,
  callback: grpc.sendUnaryData<SendEmailResponse>
): Promise<void> => {
  try {
    const emailInput: EmailInput & { from: string } = {
      from: "admin@admin.com",
      cc: call.request.cc,
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
