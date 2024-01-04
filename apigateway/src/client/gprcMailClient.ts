import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import config from "../config";
import { ProtoGrpcType } from "../../generated/email";

export const getGprcMailClient = () => {
  const { grpcPort } = config;
  const PROTO_PATH = path.resolve("../protos/email.proto");

  const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });

  const protoDescriptor = grpc.loadPackageDefinition(
    packageDefinition
  ) as unknown as ProtoGrpcType;

  const mailerEndpoint =
    `${process.env.MAILER_ENDPOINT}:${grpcPort}` || `0.0.0.0:${grpcPort}`;

  return new protoDescriptor.email.EmailService(
    mailerEndpoint,
    grpc.credentials.createInsecure()
  );
};
