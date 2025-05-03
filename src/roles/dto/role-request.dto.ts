import { GetListQueryDto } from './../../common/dto/requests/get-list-query.dto';
import { OmitType, PartialType, PickType } from '@nestjs/swagger';
import { RoleDto } from './role.dto';

export class CreateRoleDto extends PickType(RoleDto, ['name', 'description']) {}

export class UpdateRoleDto extends PartialType(
  OmitType(RoleDto, ['id'] as const),
) {}

export class RoleFiltersDto extends RoleDto {}
export class RoleListGetQueryDto extends GetListQueryDto<RoleFiltersDto> {}
