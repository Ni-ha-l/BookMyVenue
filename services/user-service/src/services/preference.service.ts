import { UserPreferenceRepository } from '../repositories/userPreference.repository';
import { logger } from '../utils/logger';
import { cacheGet, cacheSet, cacheDel } from '../utils/cache';
import { REDIS_KEYS, CACHE_TTL } from '../constants';
import { UpdatePreferencesDTO } from '../dto/profile.dto';
import { IUserPreferenceDocument } from '../models/userPreference.model';

export class PreferenceService {
  constructor(private readonly preferenceRepo: UserPreferenceRepository) {}

  async getPreferences(userId: string): Promise<IUserPreferenceDocument> {
    const cached = await cacheGet<IUserPreferenceDocument>(REDIS_KEYS.preferences(userId));
    if (cached) return cached;

    // Auto-create with defaults if not exists
    let prefs = await this.preferenceRepo.findByUserId(userId);
    if (!prefs) prefs = await this.preferenceRepo.createDefault(userId);

    await cacheSet(REDIS_KEYS.preferences(userId), prefs, CACHE_TTL.PREFERENCES);
    return prefs;
  }

  async updatePreferences(
    userId: string,
    dto: UpdatePreferencesDTO
  ): Promise<IUserPreferenceDocument> {
    const prefs = await this.preferenceRepo.upsert(userId, dto);
    await cacheDel(REDIS_KEYS.preferences(userId));
    logger.info('Preferences updated', { userId });
    return prefs;
  }
}

export const preferenceService = new PreferenceService(new UserPreferenceRepository());
