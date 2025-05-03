import { GetListQueryDto } from './../../common/dto/requests/get-list-query.dto';
import { OmitType, PartialType, PickType } from '@nestjs/swagger';
import { PermissionDto } from './permission.dto';

export class CreatePermissionDto extends PickType(PermissionDto, [
  'name',
  'description',
]) {}

export class UpdatePermissionDto extends PartialType(
  OmitType(PermissionDto, ['id'] as const),
) {}

export class PermissionFiltersDto extends PermissionDto {}
export class PermissionListGetQueryDto extends GetListQueryDto<PermissionFiltersDto> {}
