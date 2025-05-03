import { ResponseDto } from './../common/dto/responses/response.dto';
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
import { RolesService } from './roles.service';
import { ApiResponse } from '@nestjs/swagger';
import { RoleListResponseDto, RoleResponseDto } from './dto/role-response.dto';
import {
  CreateRoleDto,
  RoleListGetQueryDto,
  UpdateRoleDto,
} from './dto/role-request.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @ApiResponse({ status: 200, type: ResponseDto<RoleListResponseDto> })
  findAll(@Query() query: RoleListGetQueryDto): Promise<RoleListResponseDto> {
    return this.rolesService.findAllRoles(query);
  }

  @Post()
  @ApiResponse({ status: 200, type: ResponseDto<RoleResponseDto> })
  create(@Body() dto: CreateRoleDto): Promise<RoleResponseDto> {
    return this.rolesService.createRole(dto);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, type: ResponseDto<RoleResponseDto> })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateRoleDto,
  ): Promise<RoleResponseDto> {
    return this.rolesService.updateUser(id, dto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, type: ResponseDto<boolean> })
  delete(@Param('id') id: string): Promise<boolean> {
    return this.rolesService.deleteUser(id);
  }
}
