import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { EmailServiceClient as _email_EmailServiceClient, EmailServiceDefinition as _email_EmailServiceDefinition } from './email/EmailService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  email: {
    Email: MessageTypeDefinition
    EmailService: SubtypeConstructor<typeof grpc.Client, _email_EmailServiceClient> & { service: _email_EmailServiceDefinition }
    SendEmailResponse: MessageTypeDefinition
  }
}

