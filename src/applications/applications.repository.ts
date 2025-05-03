import { BaseRepository } from './../common/respository/base.respository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Application, ApplicationDocument } from './schemas/application.schema';

@Injectable()
export class ApplicationsRepository extends BaseRepository<ApplicationDocument> {
  constructor(
    @InjectModel(Application.name)
    private readonly applicationModel: Model<ApplicationDocument>,
  ) {
    super(applicationModel);
  }
}
