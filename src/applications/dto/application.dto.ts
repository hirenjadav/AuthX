import { PHONE_NUMBER_LENGTH } from './../../common/constants/validations.constant';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNumberString,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ApplicationDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsString({ message: 'Name should be string.' })
  @Transform(({ value }: { value: string }) => value.trim())
  name: string;

  @ApiProperty()
  @IsString({ message: 'Email should be string.' })
  @IsEmail({}, { message: 'Invalid email format.' })
  @Transform(({ value }: { value: string }) => value.trim())
  email: string;

  @ApiProperty()
  @IsNumberString({}, { message: 'Phone number should be number string.' })
  @MinLength(PHONE_NUMBER_LENGTH, {
    message: 'Minimum length of phone number should be 10',
  })
  @MaxLength(PHONE_NUMBER_LENGTH, {
    message: 'Maximum length of phone number should be 10',
  })
  phoneNumber: number;

  @ApiProperty()
  @IsString({ message: 'Createdby ID should be string.' })
  @Transform(({ value }: { value: string }) => value.trim())
  createdBy: string;

  @ApiProperty()
  @IsString({ message: 'Owner ID should be string.' })
  @Transform(({ value }: { value: string }) => value.trim())
  owner: string;
}
