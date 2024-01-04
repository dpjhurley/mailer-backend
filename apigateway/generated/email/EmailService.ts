// Original file: protos/email.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Email } from './Email';
import type { SendEmailResponse } from './SendEmailResponse';

export interface EmailServiceClient extends grpc.Client {
  SendEmail(argument: Email, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<SendEmailResponse): grpc.ClientUnaryCall;
}

export interface EmailServiceHandlers extends grpc.UntypedServiceImplementation {
  SendEmail: grpc.handleUnaryCall<Email, SendEmailResponse>;
}

export interface EmailServiceDefinition extends grpc.ServiceDefinition {
  SendEmail: MethodDefinition<Email, SendEmailResponse, Email, SendEmailResponse>
}
