import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Application, ApplicationDocument } from './schemas/application.schema';
import { Model, SortOrder } from 'mongoose';
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
import { AppException } from 'src/common/exceptions/app.exception';
import { ErrorCodes } from 'src/common/constants/error-codes.constant';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectModel(Application.name) private applicationModel: Model<Application>,
  ) {}

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

    const createdApplication = new this.applicationModel(app);
    await createdApplication.save();
    return this.toApplicationResponseDto(createdApplication);
  }

  async findAll(
    query: ApplicationListGetQueryDto,
  ): Promise<ApplicationListResponseDto> {
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

    let queryBuilder = this.applicationModel
      .find(filters || {})
      .skip(skip)
      .limit(limit);

    if (sortOptions) queryBuilder = queryBuilder.sort(sortOptions);

    const users = await queryBuilder.exec();

    return {
      items: users.map((x) => this.toApplicationResponseDto(x)),
      pagination: {
        limit,
        page,
        totalItems: 0,
      },
    };
  }

  async findOne(filters: ApplicationFiltersDto): Promise<Application> {
    const user = await this.applicationModel.findOne(filters).exec();

    if (!user) throw new AppException(ErrorCodes.APPLICATION_NOT_FOUND);

    return user;
  }

  async update(
    id: string,
    dto: UpdateApplicationDto,
  ): Promise<ApplicationResponseDto> {
    const updatedApplication = await this.applicationModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();

    if (!updatedApplication)
      throw new AppException(ErrorCodes.APPLICATION_NOT_FOUND);

    return this.toApplicationResponseDto(updatedApplication);
  }

  async delete(id: string): Promise<boolean> {
    if (!id) throw new AppException(ErrorCodes.BAD_REQUEST);

    const deletedApplication = await this.applicationModel
      .findByIdAndDelete(id)
      .exec();

    if (!deletedApplication)
      throw new AppException(ErrorCodes.APPLICATION_NOT_FOUND);

    return true;
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
