import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse } from '@nestjs/swagger';
import { signInDto } from './dto/signin.dto';
import { PublicRoute } from '../common/decorators/public-route.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @PublicRoute()
  @Post('signin')
  @ApiResponse({ status: 200 })
  async signIn(@Body() dto: signInDto): Promise<{ accessToken: string }> {
    return await this.authService.signIn(dto);
  }
}
