import { sendEmail } from "./emailService";
import { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import { Email as EmailInput } from "../../generated/email/Email";
import { SendEmailResponse } from "../../generated/email/SendEmailResponse";

const mockSendEmail = jest.fn();

jest.mock("../models/Email", () =>
  jest.fn().mockImplementation(() => ({
    sendEmail: mockSendEmail
  }))
);

describe("sendEmail", () => {
  it("should send an email successfully", async () => {
    const mockCall = {
      request: {
        cc: "test@example.com",
        to: "test@example.com",
        subject: "Test",
        body: "Test body"
      }
    } as unknown as ServerUnaryCall<EmailInput, SendEmailResponse>;

    const mockCallback =
      jest.fn() as unknown as sendUnaryData<SendEmailResponse>;

    await sendEmail(mockCall, mockCallback);

    expect(mockCallback).toHaveBeenCalledWith(null, {
      success: true,
      message: "Email sent successfully"
    });
  });

  it("should catch an error if it fails to send an email", async () => {
    const mockCall = {
      request: {
        cc: "test@example.com",
        to: "test@example.com",
        subject: "Test",
        body: "Test body"
      }
    } as unknown as ServerUnaryCall<EmailInput, SendEmailResponse>;

    const mockCallback =
      jest.fn() as unknown as sendUnaryData<SendEmailResponse>;

    // Mock the Email model to throw an error
    mockSendEmail.mockImplementation(() => {
      throw new Error("Error from sendEmail");
    });

    await sendEmail(mockCall, mockCallback);

    expect(mockCallback).toHaveBeenCalledWith(null, {
      success: false,
      message: "Failed to send email, Error: Error from sendEmail"
    });
  });
});
