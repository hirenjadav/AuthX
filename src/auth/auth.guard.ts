import { ErrorCodes } from './../common/constants/error-codes.constant';
import { AppException } from './../common/exceptions/app.exception';
import { IS_PUBLIC_ROUTE } from './../common/decorators/public-route.decorator';
import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_ROUTE,
      [context.getHandler(), context.getClass()],
    );
    if (isPublic) return true;

    const request: Request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token)
      throw new AppException({
        errorCode: ErrorCodes.UNAUTHORIZED,
        statusCode: HttpStatus.UNAUTHORIZED,
      });

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      request['user'] = payload;
    } catch {
      throw new AppException({
        errorCode: ErrorCodes.UNAUTHORIZED,
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
