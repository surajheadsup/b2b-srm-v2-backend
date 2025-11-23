import { PopulateDto } from '../dto/populate.dto';

export class PopulateBuilderUtil {
  static buildPopulateArray(populateConfig: PopulateDto[] = []): any[] {
    if (!populateConfig || populateConfig.length === 0) return [];
    return populateConfig.map((config) => ({
      path: config.path,
      select: config.select || '',
    }));
  }
}