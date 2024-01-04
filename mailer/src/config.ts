import "dotenv/config";

const config = {
  grpcPort: process.env.GRPC_PORT || "50001",
  smtpHost: process.env.SMTP_HOST || "sandbox.smtp.mailtrap.io",
  smtpPort: process.env.SMTP_PORT || "2525",
  smtpUser: process.env.SMTP_USER || "",
  smtpPassword: process.env.SMTP_PASSWORD || ""
};

if (!config) {
  throw new Error("Missing config");
}

export default config;
