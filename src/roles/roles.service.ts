import { Injectable } from '@nestjs/common';
import { RolesRepository } from './roles.repository';
import {
  CreateRoleDto,
  RoleFiltersDto,
  RoleListGetQueryDto,
  UpdateRoleDto,
} from './dto/role-request.dto';
import { RoleListResponseDto, RoleResponseDto } from './dto/role-response.dto';
import { Role, RoleDocument } from './schemas/role.schema';

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  async createRole(dto: CreateRoleDto): Promise<RoleResponseDto> {
    const role = await this.rolesRepository.create(dto);
    return this.toRoleResponseDto(role);
  }

  async findAllRoles(query: RoleListGetQueryDto): Promise<RoleListResponseDto> {
    const { items, pagination } = await this.rolesRepository.findAll(
      query.filters?.search,
      query.filters,
      { page: query.pagination?.page, limit: query.pagination?.limit },
      { sortBy: query.sorting?.sortBy, sortOrder: query.sorting?.sortOrder },
    );

    return {
      items: items.map((x) => this.toRoleResponseDto(x)),
      pagination,
    };
  }

  async findOneRole(filters: RoleFiltersDto): Promise<Role> {
    return await this.rolesRepository.findOne(filters);
  }

  async updateUser(id: string, dto: UpdateRoleDto): Promise<RoleResponseDto> {
    const updatedRole = await this.rolesRepository.update(id, dto);
    return this.toRoleResponseDto(updatedRole);
  }

  async deleteUser(id: string): Promise<boolean> {
    return await this.rolesRepository.delete(id);
  }

  private toRoleResponseDto(x: RoleDocument): RoleResponseDto {
    return {
      id: x._id.toString(),
      name: x.name,
      description: x.description,
    };
  }
}
