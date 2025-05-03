import { BaseRepository } from './../common/respository/base.respository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Permission, PermissionDocument } from './schemas/permission.schema';

@Injectable()
export class PermissionRepository extends BaseRepository<PermissionDocument> {
  constructor(
    @InjectModel(Permission.name)
    private readonly PermissionModel: Model<PermissionDocument>,
  ) {
    super(PermissionModel);
  }
}
