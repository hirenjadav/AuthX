import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UserListResponseDto, UserResponseDto } from './dto/user-response.dto';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  UpdateUserDto,
  UserListGetQueryDto,
} from './dto/user-request.dto';
import { ResponseDto } from 'src/common/dto/responses/response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiResponse({ status: 200, type: ResponseDto<UserListResponseDto> })
  findAll(@Query() query: UserListGetQueryDto): Promise<UserListResponseDto> {
    return this.usersService.findAllUsers(query);
  }

  @Post()
  @ApiResponse({ status: 200, type: ResponseDto<UserResponseDto> })
  create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.createUser(dto);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, type: ResponseDto<UserResponseDto> })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.updateUser(id, dto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, type: ResponseDto<boolean> })
  delete(@Param('id') id: string): Promise<boolean> {
    return this.usersService.deleteUser(id);
  }
}
