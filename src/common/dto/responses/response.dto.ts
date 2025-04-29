import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class ResponseMetaDto {
  @ApiProperty()
  timestamp: string;

  @ApiPropertyOptional()
  requestId?: string;
}

export class ResponsePaginationDto {
  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  totalItems: number;
}

class ResponseErrorDto {
  @ApiProperty()
  code: number;

  @ApiProperty()
  message: string;

  @ApiPropertyOptional()
  data?: any;
}

export class ResponseDto<T = any> {
  @ApiProperty()
  success: boolean;

  @ApiPropertyOptional()
  data?: T;

  @ApiPropertyOptional({ type: () => ResponseMetaDto })
  meta?: ResponseMetaDto;

  @ApiPropertyOptional({ type: () => ResponsePaginationDto })
  pagination?: ResponsePaginationDto;

  @ApiPropertyOptional({ type: () => ResponseErrorDto })
  error?: ResponseErrorDto;
}
