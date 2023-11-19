import nodemailer from "nodemailer";
import Email from "./Email";

jest.mock("nodemailer");
const mockSendMail = jest.fn();

const mockNodemailer = nodemailer.createTransport as jest.Mock;

mockNodemailer.mockReturnValue({
  sendMail: mockSendMail
});

describe("Email", () => {
  const emailInput = {
    from: "test@example.com",
    to: "test@example.com",
    subject: "Test Subject",
    body: "Test Body"
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create an email object", () => {
    const email = new Email(emailInput);
    expect(email).toBeInstanceOf(Email);
  });

  it("should catch then rethrow an error from nodemailer", async () => {
    mockSendMail.mockImplementationOnce(() => {
      throw new Error("Error from nodemailer");
    });

    const email = new Email(emailInput);
    await expect(email.sendEmail()).rejects.toThrow("Error from nodemailer");
  });

  it("should send an email", async () => {
    const email = new Email(emailInput);
    await expect(email.sendEmail()).resolves.toBeUndefined();
  });
});
