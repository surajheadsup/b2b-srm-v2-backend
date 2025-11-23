import { BaseResponse } from '../interfaces/base-response.interface';
import { PaginationResult } from '../interfaces/pagination-result.interface';
export declare class ResponseUtil {
    static success<T>(data: T, message?: string): BaseResponse<T>;
    static created<T>(data: T, message?: string): BaseResponse<T>;
    static paginated<T>(data: T[], total: number, page: number, limit: number, message?: string): BaseResponse<PaginationResult<T>>;
}
