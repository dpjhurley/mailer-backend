import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../generated/email";
import config from "./config";
import { sendEmail } from "./services/emailService";

const port = config.grpcPort;
const PROTO_PATH = path.resolve("../protos/email.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

// The types for grpc-js are too vagues so this needs to be forced
const protoDescriptor = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

const email = protoDescriptor.email;

const getServer = () => {
  const server = new grpc.Server();
  server.addService(email.EmailService.service, {
    sendEmail
  });

  return server;
};

const routeServer = getServer();

routeServer.bindAsync(
  `0.0.0.0:${port}`,
  grpc.ServerCredentials.createInsecure(),
  () => {
    routeServer.start();
    console.log("gRPC server is running...");
  }
);
