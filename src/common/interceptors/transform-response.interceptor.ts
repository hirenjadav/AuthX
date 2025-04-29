import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ResponseDto } from '../dto/responses/response.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class TransformResponseInterceptor<T>
  implements NestInterceptor<T, ResponseDto<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<ResponseDto<any>> {
    return next.handle().pipe(
      map((data: any) => {
        const response: ResponseDto<any> = {
          success: true,
          meta: {
            timestamp: new Date().toISOString(),
          },
        };

        if (
          data &&
          typeof data === 'object' &&
          'items' in data &&
          'pagination' in data
        ) {
          response.data = data.items;
          response.pagination = data.pagination;
        } else {
          response.data = data;
        }

        return response;
      }),
      catchError((error) => {
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

        if (error instanceof HttpException) {
          statusCode = error.getStatus();
          const exResponse = error.getResponse();

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

        const ctx = context.switchToHttp();
        const res = ctx.getResponse();
        res.status(statusCode).json(errorResponse);

        return throwError(() => error);
      }),
    );
  }
}
