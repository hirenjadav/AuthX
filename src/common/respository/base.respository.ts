import { Model, FilterQuery, UpdateQuery, SortOrder } from 'mongoose';
import { AppException } from '../exceptions/app.exception';
import { ErrorCodes } from '../constants/error-codes.constant';

/**
 * Generic BaseRepository class to abstract common Mongoose operations
 */
export class BaseRepository<T> {
  constructor(protected readonly model: Model<T>) {}

  /**
   * Create a new document
   * @param data - Data to create the document
   * @returns The created document
   */
  async create(data: Partial<T>): Promise<T> {
    const created = new this.model(data);
    await created.save();
    return created;
  }

  /**
   * Find documents with pagination, sorting, and optional filters
   * @param filters - Query filters
   * @param pagination - Pagination options
   * @param sorting - Sorting options
   * @returns Paginated list of documents
   */
  async findAll(
    search: string = '',
    filters: FilterQuery<T> = {},
    pagination?: {
      page: number;
      limit: number;
    },
    sorting?: {
      sortBy: string;
      sortOrder: SortOrder;
    },
  ): Promise<{
    items: T[];
    pagination: {
      page: number;
      limit: number;
      totalItems: number;
    };
  }> {
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    const skip = (page - 1) * limit;

    let sortOptions: Record<string, SortOrder> | undefined = undefined;
    if (sorting?.sortBy) {
      sortOptions = {
        [sorting.sortBy]: sorting.sortOrder,
      };
    }

    const queryBuilder = this.model.find(filters).skip(skip).limit(limit);
    if (sortOptions) queryBuilder.sort(sortOptions);

    const [items, totalItems] = await Promise.all([
      queryBuilder.exec(),
      this.model.countDocuments(filters),
    ]);

    return {
      items,
      pagination: {
        page,
        limit,
        totalItems,
      },
    };
  }

  /**
   * Find a single document by filter
   * @param filters - Query filters
   * @throws AppException if not found
   */
  async findOne(filters: FilterQuery<T>): Promise<T> {
    const entity = await this.model.findOne(filters).exec();
    if (!entity) throw new AppException(ErrorCodes.ENTITY_NOT_FOUND);
    return entity;
  }

  /**
   * Update a document by ID
   * @param id - Document ID
   * @param data - Data to update
   * @returns The updated document
   */
  async update(id: string, data: UpdateQuery<T>): Promise<T> {
    const updated = await this.model
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    if (!updated) throw new AppException(ErrorCodes.ENTITY_NOT_FOUND);
    return updated;
  }

  /**
   * Delete a document by ID
   * @param id - Document ID
   * @returns Boolean indicating success
   */
  async delete(id: string): Promise<boolean> {
    if (!id) throw new AppException(ErrorCodes.BAD_REQUEST);
    const deleted = await this.model.findByIdAndDelete(id).exec();
    if (!deleted) throw new AppException(ErrorCodes.ENTITY_NOT_FOUND);
    return true;
  }
}
