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
import { PermissionsService } from './permissions.service';
import {
  PermissionListResponseDto,
  PermissionResponseDto,
} from './dto/permission-response.dto';
import { ApiResponse } from '@nestjs/swagger';
import {
  CreatePermissionDto,
  PermissionListGetQueryDto,
  UpdatePermissionDto,
} from './dto/permission-request.dto';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  @ApiResponse({ status: 200, type: ResponseDto<PermissionListResponseDto> })
  findAll(
    @Query() query: PermissionListGetQueryDto,
  ): Promise<PermissionListResponseDto> {
    return this.permissionsService.findAll(query);
  }

  @Post()
  @ApiResponse({ status: 200, type: ResponseDto<PermissionResponseDto> })
  create(@Body() dto: CreatePermissionDto): Promise<PermissionResponseDto> {
    return this.permissionsService.create(dto);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, type: ResponseDto<PermissionResponseDto> })
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePermissionDto,
  ): Promise<PermissionResponseDto> {
    return this.permissionsService.update(id, dto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, type: ResponseDto<boolean> })
  delete(@Param('id') id: string): Promise<boolean> {
    return this.permissionsService.delete(id);
  }
}
