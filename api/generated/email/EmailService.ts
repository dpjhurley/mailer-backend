// Original file: protos/email.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Email as _email_Email, Email__Output as _email_Email__Output } from '../email/Email';
import type { SendEmailResponse as _email_SendEmailResponse, SendEmailResponse__Output as _email_SendEmailResponse__Output } from '../email/SendEmailResponse';

export interface EmailServiceClient extends grpc.Client {
  SendEmail(argument: _email_Email, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_email_SendEmailResponse__Output>): grpc.ClientUnaryCall;
  SendEmail(argument: _email_Email, metadata: grpc.Metadata, callback: grpc.requestCallback<_email_SendEmailResponse__Output>): grpc.ClientUnaryCall;
  SendEmail(argument: _email_Email, options: grpc.CallOptions, callback: grpc.requestCallback<_email_SendEmailResponse__Output>): grpc.ClientUnaryCall;
  SendEmail(argument: _email_Email, callback: grpc.requestCallback<_email_SendEmailResponse__Output>): grpc.ClientUnaryCall;
  sendEmail(argument: _email_Email, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_email_SendEmailResponse__Output>): grpc.ClientUnaryCall;
  sendEmail(argument: _email_Email, metadata: grpc.Metadata, callback: grpc.requestCallback<_email_SendEmailResponse__Output>): grpc.ClientUnaryCall;
  sendEmail(argument: _email_Email, options: grpc.CallOptions, callback: grpc.requestCallback<_email_SendEmailResponse__Output>): grpc.ClientUnaryCall;
  sendEmail(argument: _email_Email, callback: grpc.requestCallback<_email_SendEmailResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface EmailServiceHandlers extends grpc.UntypedServiceImplementation {
  SendEmail: grpc.handleUnaryCall<_email_Email__Output, _email_SendEmailResponse>;
  
}

export interface EmailServiceDefinition extends grpc.ServiceDefinition {
  SendEmail: MethodDefinition<_email_Email, _email_SendEmailResponse, _email_Email__Output, _email_SendEmailResponse__Output>
}
