import { GetListResponseDto } from './../../common/dto/responses/get-list-response.dto';
import { ApplicationDto } from './application.dto';

export class ApplicationResponseDto extends ApplicationDto {}

export class ApplicationListResponseDto extends GetListResponseDto<ApplicationResponseDto> {}
