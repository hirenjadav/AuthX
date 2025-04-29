import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessages } from '../constants/error-messages.constant';

interface AppExceptionOptions {
  errorCode: number;
  message?: string;
  data?: unknown;
  statusCode?: HttpStatus;
}

export class AppException extends HttpException {
  constructor(options: AppExceptionOptions | number) {
    if (typeof options == 'number') options = { errorCode: options };

    const { errorCode, message, data, statusCode } = options;

    const resolvedMessage =
      message || ErrorMessages[errorCode] || 'Something went wrong';

    const resolvedStatusCode =
      statusCode ??
      (ErrorMessages[errorCode] ? HttpStatus.OK : HttpStatus.BAD_REQUEST);

    const errorResponse = {
      code: errorCode,
      message: resolvedMessage,
      ...(data ? { data } : {}),
    };

    super(errorResponse, resolvedStatusCode);
  }
}
