import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class PermissionDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsString({ message: 'Name should be string.' })
  @Transform(({ value }: { value: string }) => value.trim())
  name: string;

  @ApiProperty()
  @IsString({ message: 'Description should be string.' })
  @Transform(({ value }: { value: string }) => value.trim())
  description: string;
}
