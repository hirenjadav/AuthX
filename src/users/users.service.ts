import { Injectable } from '@nestjs/common';
import { User, UserDocument } from 'src/users/schema/user.schema';
import {
  CreateUserDto,
  UpdateUserDto,
  UserFiltersDto,
  UserListGetQueryDto,
} from './dto/user-request.dto';
import { UserListResponseDto, UserResponseDto } from './dto/user-response.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(createUser: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.usersRepository.create(createUser);
    return this.toUserResponseDto(user);
  }

  async findAllUsers(query: UserListGetQueryDto): Promise<UserListResponseDto> {
    const { items, pagination } = await this.usersRepository.findAll(
      query.filters?.search,
      query.filters,
      { page: query.pagination?.page, limit: query.pagination?.limit },
      { sortBy: query.sorting?.sortBy, sortOrder: query.sorting?.sortOrder },
    );

    return {
      items: items.map((x) => this.toUserResponseDto(x)),
      pagination,
    };
  }

  async findOneUser(filters: UserFiltersDto): Promise<User> {
    return await this.usersRepository.findOne(filters);
  }

  async updateUser(
    id: string,
    updateUser: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const updatedUser = await this.usersRepository.update(id, updateUser);
    return this.toUserResponseDto(updatedUser);
  }

  async deleteUser(id: string): Promise<boolean> {
    return await this.usersRepository.delete(id);
  }

  private toUserResponseDto(user: UserDocument): UserResponseDto {
    return {
      id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  }
}
