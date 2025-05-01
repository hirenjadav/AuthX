import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
