import { ApiProperty } from '@nestjs/swagger';
import { ResponsePaginationDto } from './response.dto';

export class GetListResponseDto<T> {
  @ApiProperty({ isArray: true })
  items: T[];

  @ApiProperty({ type: ResponsePaginationDto })
  pagination: ResponsePaginationDto;
}
