import { Request, Response, NextFunction } from 'express';
import { profileService } from '../services/profile.service';
import { sendSuccess } from '../utils/response';
import { HTTP_STATUS, SUCCESS_MESSAGES, ERROR_MESSAGES } from '../constants';
import { AppError } from '../utils/AppError';

export class ProfileController {
  async getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const profile = await profileService.getProfile(req.user!.userId);
      sendSuccess(res, HTTP_STATUS.OK, SUCCESS_MESSAGES.PROFILE_FETCHED, { profile });
    } catch (err) {
      next(err);
    }
  }

  async createProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const profile = await profileService.createProfile(req.user!.userId, req.body);
      sendSuccess(res, HTTP_STATUS.CREATED, SUCCESS_MESSAGES.PROFILE_CREATED, { profile });
    } catch (err) {
      next(err);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const profile = await profileService.updateProfile(req.user!.userId, req.body);
      sendSuccess(res, HTTP_STATUS.OK, SUCCESS_MESSAGES.PROFILE_UPDATED, { profile });
    } catch (err) {
      next(err);
    }
  }

  async uploadProfileImage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.file) throw new AppError(ERROR_MESSAGES.IMAGE_UPLOAD_FAILED, HTTP_STATUS.BAD_REQUEST);
      const profile = await profileService.uploadProfileImage(req.user!.userId, req.file.buffer);
      sendSuccess(res, HTTP_STATUS.OK, SUCCESS_MESSAGES.IMAGE_UPLOADED, {
        profileImage: profile.profileImage,
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteProfileImage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await profileService.deleteProfileImage(req.user!.userId);
      sendSuccess(res, HTTP_STATUS.OK, SUCCESS_MESSAGES.IMAGE_DELETED);
    } catch (err) {
      next(err);
    }
  }
}

export const profileController = new ProfileController();
