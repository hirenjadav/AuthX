import { ErrorCodes } from './../common/constants/error-codes.constant';
import { AppException } from './../common/exceptions/app.exception';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, SortOrder } from 'mongoose';
import { User, UserDocument } from 'src/users/schema/user.schema';
import {
  CreateUserDto,
  UpdateUserDto,
  UserFiltersDto,
  UserListGetQueryDto,
} from './dto/user-request.dto';
import { UserListResponseDto, UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createUser: CreateUserDto): Promise<UserResponseDto> {
    const createdUser = new this.userModel(createUser);
    await createdUser.save();
    return this.toUserResponseDto(createdUser);
  }

  async findAllUsers(query: UserListGetQueryDto): Promise<UserListResponseDto> {
    const { filters, pagination, sorting } = query;
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    const skip = (page - 1) * limit;

    let sortOptions: Record<string, SortOrder> | undefined = undefined;

    if (sorting?.sortBy) {
      sortOptions = {
        [sorting.sortBy]: sorting.sortOrder === 'desc' ? -1 : 1,
      };
    }

    let queryBuilder = this.userModel
      .find(filters || {})
      .skip(skip)
      .limit(limit);

    if (sortOptions) queryBuilder = queryBuilder.sort(sortOptions);

    const users = await queryBuilder.exec();

    return {
      items: users.map((x) => this.toUserResponseDto(x)),
      pagination: {
        limit,
        page,
        totalItems: 0,
      },
    };
  }

  async findOneUser(filters: UserFiltersDto): Promise<User> {
    const user = await this.userModel.findOne(filters).exec();

    if (!user) throw new AppException(ErrorCodes.USER_NOT_FOUND);

    return user;
  }

  async updateUser(
    id: string,
    updateUser: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUser, { new: true })
      .exec();

    if (!updatedUser) throw new AppException(ErrorCodes.USER_NOT_FOUND);

    return this.toUserResponseDto(updatedUser);
  }

  async deleteUser(id: string): Promise<boolean> {
    if (!id) throw new AppException(ErrorCodes.BAD_REQUEST);

    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();

    if (!deletedUser) throw new AppException(ErrorCodes.USER_NOT_FOUND);

    return true;
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
