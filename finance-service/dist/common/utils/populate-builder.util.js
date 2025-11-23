"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PopulateBuilderUtil = void 0;
class PopulateBuilderUtil {
    static buildPopulateArray(populateConfig = []) {
        if (!populateConfig || populateConfig.length === 0)
            return [];
        return populateConfig.map((config) => ({
            path: config.path,
            select: config.select || '',
        }));
    }
}
exports.PopulateBuilderUtil = PopulateBuilderUtil;
//# sourceMappingURL=populate-builder.util.js.map