import { UserProfileRepository } from '../repositories/userProfile.repository';
import { cloudinaryService } from './cloudinary.service';
import { AppError } from '../utils/AppError';
import { logger } from '../utils/logger';
import { cacheGet, cacheSet, cacheDel } from '../utils/cache';
import { HTTP_STATUS, ERROR_MESSAGES, SUCCESS_MESSAGES, REDIS_KEYS, CACHE_TTL } from '../constants';
import { CreateProfileDTO, UpdateProfileDTO } from '../dto/profile.dto';
import { IUserProfileDocument } from '../models/userProfile.model';

export class ProfileService {
  constructor(private readonly profileRepo: UserProfileRepository) {}

  async getProfile(userId: string): Promise<IUserProfileDocument> {
    const cached = await cacheGet<IUserProfileDocument>(REDIS_KEYS.profile(userId));
    if (cached) return cached;

    const profile = await this.profileRepo.findByUserId(userId);
    if (!profile) throw new AppError(ERROR_MESSAGES.PROFILE_NOT_FOUND, HTTP_STATUS.NOT_FOUND);

    await cacheSet(REDIS_KEYS.profile(userId), profile, CACHE_TTL.PROFILE);
    return profile;
  }

  async createProfile(userId: string, dto: CreateProfileDTO): Promise<IUserProfileDocument> {
    const existing = await this.profileRepo.findByUserId(userId);
    if (existing) throw new AppError(ERROR_MESSAGES.PROFILE_EXISTS, HTTP_STATUS.CONFLICT);

    const profile = await this.profileRepo.create(userId, dto);
    logger.info('Profile created', { userId });
    return profile;
  }

  async updateProfile(userId: string, dto: UpdateProfileDTO): Promise<IUserProfileDocument> {
    const profile = await this.profileRepo.update(userId, dto);
    if (!profile) throw new AppError(ERROR_MESSAGES.PROFILE_NOT_FOUND, HTTP_STATUS.NOT_FOUND);

    await cacheDel(REDIS_KEYS.profile(userId));
    logger.info('Profile updated', { userId });
    return profile;
  }

  async uploadProfileImage(userId: string, fileBuffer: Buffer): Promise<IUserProfileDocument> {
    const existing = await this.profileRepo.findByUserId(userId);
    if (!existing) throw new AppError(ERROR_MESSAGES.PROFILE_NOT_FOUND, HTTP_STATUS.NOT_FOUND);

    // Delete old image from Cloudinary if exists
    if (existing.cloudinaryPublicId) {
      await cloudinaryService.deleteImage(existing.cloudinaryPublicId);
    }

    const { url, publicId } = await cloudinaryService.uploadImage(fileBuffer, userId);
    const profile = await this.profileRepo.updateImage(userId, url, publicId);

    await cacheDel(REDIS_KEYS.profile(userId));
    logger.info('Profile image uploaded', { userId });
    return profile!;
  }

  async deleteProfileImage(userId: string): Promise<IUserProfileDocument> {
    const existing = await this.profileRepo.findByUserId(userId);
    if (!existing) throw new AppError(ERROR_MESSAGES.PROFILE_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    if (!existing.cloudinaryPublicId) {
      throw new AppError(ERROR_MESSAGES.IMAGE_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    await cloudinaryService.deleteImage(existing.cloudinaryPublicId);
    const profile = await this.profileRepo.removeImage(userId);

    await cacheDel(REDIS_KEYS.profile(userId));
    logger.info('Profile image deleted', { userId });
    return profile!;
  }
}

export const profileService = new ProfileService(new UserProfileRepository());
