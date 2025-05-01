import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApiResponse } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/responses/response.dto';
import {
  ApplicationListResponseDto,
  ApplicationResponseDto,
} from './dto/application-response.dto';
import {
  ApplicationListGetQueryDto,
  CreateApplicationDto,
  UpdateApplicationDto,
} from './dto/application-request.dto';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationService: ApplicationsService) {}

  @Get()
  @ApiResponse({ status: 200, type: ResponseDto<ApplicationListResponseDto> })
  findAll(
    @Query() query: ApplicationListGetQueryDto,
  ): Promise<ApplicationListResponseDto> {
    return this.applicationService.findAll(query);
  }

  @Post()
  @ApiResponse({ status: 200, type: ResponseDto<ApplicationResponseDto> })
  create(
    @Req() req: Request,
    @Body() dto: CreateApplicationDto,
  ): Promise<ApplicationResponseDto> {
    const userId: string = req['user'].id;
    return this.applicationService.create(userId, dto);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, type: ResponseDto<ApplicationResponseDto> })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateApplicationDto,
  ): Promise<ApplicationResponseDto> {
    return this.applicationService.update(id, dto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, type: ResponseDto<boolean> })
  delete(@Param('id') id: string): Promise<boolean> {
    return this.applicationService.delete(id);
  }
}
