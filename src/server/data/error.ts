import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

export class PrismaError extends Error {
  originalError?: unknown;
  prismaErrorType?: string;
  code?: string;

  constructor(error: unknown) {
    super();

    if (error instanceof PrismaClientKnownRequestError) {
      this.originalError = error;
      this.prismaErrorType = 'PrismaClientKnownRequestError';
      this.message = error.message;
      this.code = error.code;
      this.cause = error.cause;
      this.stack = error.stack;
    } else if (error instanceof PrismaClientUnknownRequestError) {
      this.originalError = error;
      this.prismaErrorType = 'PrismaClientUnknownRequestError';
      this.message = error.message;
      this.cause = error.cause;
      this.stack = error.stack;
    } else if (error instanceof PrismaClientRustPanicError) {
      this.originalError = error;
      this.prismaErrorType = 'PrismaClientRustPanicError';
      this.message = error.message;
      this.cause = error.cause;
      this.stack = error.stack;
    } else if (error instanceof PrismaClientInitializationError) {
      this.originalError = error;
      this.prismaErrorType = 'PrismaClientInitializationError';
      this.message = error.message;
      this.cause = error.cause;
      this.stack = error.stack;
    } else if (error instanceof PrismaClientValidationError) {
      this.originalError = error;
      this.prismaErrorType = 'PrismaClientValidationError';
      this.message = error.message;
      this.cause = error.cause;
      this.stack = error.stack;
    } else {
      this.message = 'unknown prisma error';
    }
  }
}
