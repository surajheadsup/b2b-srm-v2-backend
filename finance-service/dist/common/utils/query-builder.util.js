"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBuilderUtil = void 0;
class QueryBuilderUtil {
    static buildSearchQuery(search) {
        const query = {};
        if (!search || Object.keys(search).length === 0)
            return query;
        Object.keys(search).forEach((key) => {
            const value = search[key];
            if (value !== null && value !== undefined && value !== '') {
                if (typeof value === 'string') {
                    query[key] = { $regex: value, $options: 'i' };
                }
                else if (typeof value === 'number' || typeof value === 'boolean') {
                    query[key] = value;
                }
                else if (Array.isArray(value)) {
                    query[key] = { $in: value };
                }
                else if (typeof value === 'object') {
                    query[key] = value;
                }
            }
        });
        return query;
    }
}
exports.QueryBuilderUtil = QueryBuilderUtil;
//# sourceMappingURL=query-builder.util.js.map