import { HttpStatus } from '@nestjs/common';
import { BaseResponse } from '../interfaces/base-response.interface';
import { PaginationResult } from '../interfaces/pagination-result.interface';

export class ResponseUtil {
  static success<T>(data: T, message = 'Success'): BaseResponse<T> {
    return {
      success: true,
      statusCode: HttpStatus.OK,
      message,
      data,
      timestamp: Date.now(),
    };
  }

  static created<T>(data: T, message = 'Created'): BaseResponse<T> {
    return {
      success: true,
      statusCode: HttpStatus.CREATED,
      message,
      data,
      timestamp: Date.now(),
    };
  }

  static paginated<T>(
    data: T[],
    total: number,
    page: number,
    limit: number,
    message = 'Success',
  ): BaseResponse<PaginationResult<T>> {
    const totalPages = Math.ceil(total / limit);
    return {
      success: true,
      statusCode: HttpStatus.OK,
      message,
      data: {
        data,
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      timestamp: Date.now(),
    };
  }
}
