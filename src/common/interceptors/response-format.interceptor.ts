import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ResponseDto } from '../dto/responses/response.dto';

@Injectable()
export class ResponseFormatInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
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
    );
  }
}
