import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNumberString, IsString } from 'class-validator';

export class ApplicationDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  name: string;

  @IsString()
  @IsEmail()
  @Transform(({ value }: { value: string }) => value.trim())
  @ApiProperty()
  email: string;

  @ApiProperty()
  @IsNumberString()
  phoneNumber: number;

  @ApiProperty()
  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  createBy: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  owner: string;
}
