import { Request, Response } from "express";
import { Email } from "../../generated/email/Email";
import { SendMailRequest, getMailController } from "./mailController";

const mockGrpcMailClient = {
  SendEmail: jest.fn()
};

const mockRequest = (email: Email) =>
  ({
    body: email
  }) as SendMailRequest;

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe("getMailController", () => {
  const mailController = getMailController(mockGrpcMailClient);

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("sendEmail", () => {
    test("should return 500 if grpcClient.SendEmail returns an error", async () => {
      const error = new Error("grpc error");
      mockGrpcMailClient.SendEmail.mockImplementation((_, callback) =>
        callback(error)
      );

      const req = mockRequest({
        to: "test@test.com",
        from: "test@test.com",
        subject: "test",
        body: "test"
      });
      const res = mockResponse();

      mailController.sendEmail(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith("Internal Server Error");
    });

    test("should return 500 if grpcClient.SendEmail does not return a response", async () => {
      mockGrpcMailClient.SendEmail.mockImplementation((_, callback) =>
        callback(null, null)
      );

      const req = mockRequest({
        to: "test@test.com",
        from: "test@test.com",
        subject: "test",
        body: "test"
      });
      const res = mockResponse();

      mailController.sendEmail(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith("Internal Server Error");
    });

    test("should return 400 if grpcClient.SendEmail returns an unsuccessful response", async () => {
      const response = {
        success: false,
        message: "nodemailer error due to incorrect recipients supplied"
      };
      mockGrpcMailClient.SendEmail.mockImplementation((_, callback) =>
        callback(null, response)
      );

      const req = mockRequest({
        to: "test",
        from: "test",
        subject: "test",
        body: "test"
      });
      const res = mockResponse();

      mailController.sendEmail(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith(response.message);
    });

    test("should return 200 if grpcClient.SendEmail returns a successful response", async () => {
      const response = { success: true, message: "Email sent successfully" };
      mockGrpcMailClient.SendEmail.mockImplementation((params, callback) =>
        callback(null, response)
      );

      const req = mockRequest({
        to: "test@test.com",
        from: "test@test.com",
        subject: "test",
        body: "test"
      });
      const res = mockResponse();

      mailController.sendEmail(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        success: response.success,
        message: response.message
      });
    });
  });
});
