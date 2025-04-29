import { GetListResponseDto } from './../../common/dto/responses/get-list-response.dto';
import { OmitType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class UserResponseDto extends OmitType(UserDto, ['password']) {}

export class UserListResponseDto extends GetListResponseDto<UserResponseDto> {}
