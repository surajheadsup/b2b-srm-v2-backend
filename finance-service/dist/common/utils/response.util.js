"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseUtil = void 0;
const common_1 = require("@nestjs/common");
class ResponseUtil {
    static success(data, message = 'Success') {
        return {
            success: true,
            statusCode: common_1.HttpStatus.OK,
            message,
            data,
            timestamp: Date.now(),
        };
    }
    static created(data, message = 'Created') {
        return {
            success: true,
            statusCode: common_1.HttpStatus.CREATED,
            message,
            data,
            timestamp: Date.now(),
        };
    }
    static paginated(data, total, page, limit, message = 'Success') {
        const totalPages = Math.ceil(total / limit);
        return {
            success: true,
            statusCode: common_1.HttpStatus.OK,
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
exports.ResponseUtil = ResponseUtil;
//# sourceMappingURL=response.util.js.map