import { ErrorCodes } from './../common/constants/error-codes.constant';
import { AppException } from './../common/exceptions/app.exception';
import { UsersService } from './../users/users.service';
import { Body, Injectable, Post } from '@nestjs/common';
import { signInDto } from './dto/signin.dto';
import { ApiResponse } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Post()
  @ApiResponse({ status: 200 })
  async signIn(@Body() dto: signInDto): Promise<{ accessToken: string }> {
    try {
      dto.email = dto.email.trim();
      dto.password = dto.password.trim();

      const user = await this.usersService.findOneUser({ email: dto.email });

      if (user.password.toLowerCase() != dto.password.toLowerCase()) {
        throw new AppException(ErrorCodes.INVALID_USER_CREDENTIALS);
      }

      const payload = { id: user._id, email: user.email };
      return {
        accessToken: await this.jwtService.signAsync(payload),
      };
    } catch (e: any) {
      if (e instanceof AppException) {
        const error = e.getResponse();

        if (
          error &&
          (error['code'] === ErrorCodes.USER_NOT_FOUND ||
            error['code'] === ErrorCodes.INVALID_USER_CREDENTIALS)
        ) {
          throw new AppException(ErrorCodes.INVALID_USER_CREDENTIALS);
        }

        throw e; // Re-throw if it's an AppException but not USER_NOT_FOUND
      }

      throw e; // Forward all other (non-AppException) errors
    }
  }
}
