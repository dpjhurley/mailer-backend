import type * as grpc from "@grpc/grpc-js";
import type { MessageTypeDefinition } from "@grpc/proto-loader";

import type {
  EmailServiceClient,
  EmailServiceDefinition
} from "./email/EmailService";

type SubtypeConstructor<
  Constructor extends new (...args: any) => any,
  Subtype
> = {
  new (...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  email: {
    Email: MessageTypeDefinition;
    EmailService: SubtypeConstructor<typeof grpc.Client, EmailServiceClient> & {
      service: EmailServiceDefinition;
    };
    SendEmailResponse: MessageTypeDefinition;
  };
}
