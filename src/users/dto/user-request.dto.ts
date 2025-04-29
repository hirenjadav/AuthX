import { OmitType, PartialType, PickType } from '@nestjs/swagger';
import { UserDto } from './user.dto';
import { GetListQueryDto } from 'src/common/dto/requests/get-list-query.dto';

export class CreateUserDto extends PickType(UserDto, [
  'firstName',
  'lastName',
  'email',
  'password',
]) {}

export class UpdateUserDto extends PartialType(
  OmitType(UserDto, ['id'] as const),
) {}

class UserFiltersDto extends PartialType(
  OmitType(UserDto, ['password'] as const),
) {}
export class UserListGetQueryDto extends GetListQueryDto<UserFiltersDto> {}
