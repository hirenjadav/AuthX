import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ValidateNested,
  IsOptional,
  IsString,
  IsInt,
  Min,
  IsIn,
} from 'class-validator';

class GetListQueryFilterDto {
  @ApiPropertyOptional({ description: 'General search keyword' })
  @IsOptional()
  @IsString()
  search?: string;
}

class GetListQueryPaginationDto {
  @ApiPropertyOptional({
    default: 1,
    description: 'Page number (starts from 1)',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ default: 10, description: 'Items per page' })
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number = 10;
}

class GetListQuerySortDto {
  @ApiPropertyOptional({ description: 'Sort field name (example: createdAt)' })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiPropertyOptional({
    description: 'Sort order',
    enum: ['asc', 'desc'],
    default: 'asc',
  })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc' = 'asc';
}

export class GetListQueryDto<TFilters = unknown> {
  @ApiPropertyOptional({ type: GetListQueryPaginationDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => GetListQueryPaginationDto)
  pagination?: GetListQueryPaginationDto;

  @ApiPropertyOptional({ type: GetListQuerySortDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => GetListQuerySortDto)
  sorting?: GetListQuerySortDto;

  @ApiPropertyOptional({ type: Object })
  @IsOptional()
  @ValidateNested()
  @Type(() => Object)
  filters?: TFilters & GetListQueryFilterDto;
}
