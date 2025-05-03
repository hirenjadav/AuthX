import { GetListResponseDto } from './../../common/dto/responses/get-list-response.dto';
import { RoleDto } from './role.dto';

export class RoleResponseDto extends RoleDto {}

export class RoleListResponseDto extends GetListResponseDto<RoleResponseDto> {}
