import { GetListResponseDto } from './../../common/dto/responses/get-list-response.dto';
import { PermissionDto } from './permission.dto';

export class PermissionResponseDto extends PermissionDto {}

export class PermissionListResponseDto extends GetListResponseDto<PermissionResponseDto> {}
