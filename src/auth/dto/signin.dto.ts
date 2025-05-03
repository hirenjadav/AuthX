import { PASSWORD_REGEX } from './../../common/constants/validations.constant';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, Matches } from 'class-validator';

export class signInDto {
  @ApiProperty()
  @IsString({ message: 'Email should be string.' })
  @IsEmail({}, { message: 'Invalid email format.' })
  @Transform(({ value }: { value: string }) => value.trim())
  email: string;

  @ApiProperty({
    example: 'StrongP@ssw0rd!',
    description:
      'Password must be 8-32 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.',
  })
  @IsString({ message: 'Password must be a string.' })
  @Transform(({ value }: { value: string }) => value.trim())
  @Matches(PASSWORD_REGEX, {
    message:
      'Password must be 8-32 characters long, include uppercase, lowercase, number, and special character.',
  })
  password: string;
}
