import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ResponseDto } from '../dto/responses/response.dto';

@Catch()
export class AppExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    const errorResponse: ResponseDto = {
      success: false,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: undefined,
      },
      error: {
        code: 5000,
        message: 'Internal server error',
      },
    };

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const exResponse = exception.getResponse();

      if (typeof exResponse === 'object' && exResponse !== null) {
        const { code, message, data } = exResponse as any;

        errorResponse.error = {
          code: code ?? 5000,
          message: message ?? 'Internal server error',
          ...(data ? { data } : {}),
        };
      } else if (typeof exResponse === 'string') {
        errorResponse.error!.message = exResponse;
      }
    }

    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    res.status(statusCode).json(errorResponse);
  }
}
