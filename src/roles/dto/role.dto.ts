import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class RoleDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  name: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  description: string;
}
