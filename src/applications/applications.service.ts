import { Injectable } from '@nestjs/common';
import { Application, ApplicationDocument } from './schemas/application.schema';
import {
  ApplicationFiltersDto,
  ApplicationListGetQueryDto,
  CreateApplicationDto,
  UpdateApplicationDto,
} from './dto/application-request.dto';
import {
  ApplicationListResponseDto,
  ApplicationResponseDto,
} from './dto/application-response.dto';
import { ApplicationsRepository } from './applications.repository';

@Injectable()
export class ApplicationsService {
  constructor(private applicationsResponsitory: ApplicationsRepository) {}

  async create(
    userId: string,
    dto: CreateApplicationDto,
  ): Promise<ApplicationResponseDto> {
    const app = {
      name: dto.name,
      email: dto.email,
      phoneNumber: dto.phoneNumber,
      createdBy: userId,
      owner: userId,
    };
    const createdApplication = await this.applicationsResponsitory.create(
      app as any,
    );
    return this.toApplicationResponseDto(createdApplication);
  }

  async findAll(
    query: ApplicationListGetQueryDto,
  ): Promise<ApplicationListResponseDto> {
    const { items, pagination } = await this.applicationsResponsitory.findAll(
      query.filters?.search,
      query.filters,
      { page: query.pagination?.page, limit: query.pagination?.limit },
      { sortBy: query.sorting?.sortBy, sortOrder: query.sorting?.sortOrder },
    );

    return {
      items: items.map((x) => this.toApplicationResponseDto(x)),
      pagination,
    };
  }

  async findOne(filters: ApplicationFiltersDto): Promise<Application> {
    return await this.applicationsResponsitory.findOne(filters);
  }

  async update(
    id: string,
    dto: UpdateApplicationDto,
  ): Promise<ApplicationResponseDto> {
    const updatedApplication = await this.applicationsResponsitory.update(
      id,
      dto,
    );
    return this.toApplicationResponseDto(updatedApplication);
  }

  async delete(id: string): Promise<boolean> {
    return await this.applicationsResponsitory.delete(id);
  }

  private toApplicationResponseDto(
    data: ApplicationDocument,
  ): ApplicationResponseDto {
    return {
      id: data._id.toString(),
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      createBy: data.createBy.toString(),
      owner: data.owner.toString(),
    };
  }
}
