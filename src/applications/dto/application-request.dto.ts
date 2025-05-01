import { GetListQueryDto } from './../../common/dto/requests/get-list-query.dto';
import { OmitType, PartialType, PickType } from '@nestjs/swagger';
import { ApplicationDto } from './application.dto';

export class CreateApplicationDto extends PickType(ApplicationDto, [
  'name',
  'email',
  'phoneNumber',
]) {}

export class UpdateApplicationDto extends PartialType(
  OmitType(ApplicationDto, ['id', 'createBy'] as const),
) {}

export class ApplicationFiltersDto extends PartialType(ApplicationDto) {}

export class ApplicationListGetQueryDto extends GetListQueryDto<ApplicationFiltersDto> {}
