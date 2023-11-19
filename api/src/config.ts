import ini from "ini";
import fs from "node:fs";

interface GrpcConfig {
  port: number;
}
interface grpcPort {
  port: number;
}
interface SmtpConfig {
  host: string;
  port: number;
  user: string;
  password: string;
}

interface CustomConfig {
  grpc: GrpcConfig;
  smtp: SmtpConfig;
  api: grpcPort;
}

const config = ini.parse(
  fs.readFileSync("config.ini", "utf-8")
) as unknown as CustomConfig;

if (!config) {
  throw new Error("Missing config");
}

export default config;
