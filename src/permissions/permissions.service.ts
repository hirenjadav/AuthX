import { Injectable } from '@nestjs/common';
import { PermissionRepository } from './permissions.repository';
import {
  CreatePermissionDto,
  PermissionFiltersDto,
  PermissionListGetQueryDto,
  UpdatePermissionDto,
} from './dto/permission-request.dto';
import {
  PermissionListResponseDto,
  PermissionResponseDto,
} from './dto/permission-response.dto';
import { Permission, PermissionDocument } from './schemas/permission.schema';

@Injectable()
export class PermissionsService {
  constructor(private readonly permissionsRepository: PermissionRepository) {}

  async create(dto: CreatePermissionDto): Promise<PermissionResponseDto> {
    const permission = await this.permissionsRepository.create(dto);
    return this.toPermissionResponseDto(permission);
  }

  async findAll(
    query: PermissionListGetQueryDto,
  ): Promise<PermissionListResponseDto> {
    const { items, pagination } = await this.permissionsRepository.findAll(
      query.filters?.search,
      query.filters,
      { page: query.pagination?.page, limit: query.pagination?.limit },
      { sortBy: query.sorting?.sortBy, sortOrder: query.sorting?.sortOrder },
    );

    return {
      items: items.map((x) => this.toPermissionResponseDto(x)),
      pagination,
    };
  }

  async findOne(filters: PermissionFiltersDto): Promise<Permission> {
    return await this.permissionsRepository.findOne(filters);
  }

  async update(
    id: string,
    dto: UpdatePermissionDto,
  ): Promise<PermissionResponseDto> {
    const updatedRole = await this.permissionsRepository.update(id, dto);
    return this.toPermissionResponseDto(updatedRole);
  }

  async delete(id: string): Promise<boolean> {
    return await this.permissionsRepository.delete(id);
  }

  private toPermissionResponseDto(
    x: PermissionDocument,
  ): PermissionResponseDto {
    return {
      id: x._id.toString(),
      name: x.name,
      description: x.description,
    };
  }
}
