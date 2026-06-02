import cloudinary from '../config/cloudinary';
import { CLOUDINARY_FOLDER } from '../constants';
import { AppError } from '../utils/AppError';
import { HTTP_STATUS, ERROR_MESSAGES } from '../constants';
import { logger } from '../utils/logger';

export class CloudinaryService {
  async uploadImage(
    fileBuffer: Buffer,
    userId: string
  ): Promise<{ url: string; publicId: string }> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: CLOUDINARY_FOLDER,
          public_id: `profile_${userId}`,
          overwrite: true,
          transformation: [{ width: 400, height: 400, crop: 'fill', quality: 'auto' }],
        },
        (error, result) => {
          if (error || !result) {
            logger.error('Cloudinary upload failed', { userId, error });
            return reject(new AppError(ERROR_MESSAGES.IMAGE_UPLOAD_FAILED, HTTP_STATUS.INTERNAL_ERROR));
          }
          logger.info('Profile image uploaded', { userId, publicId: result.public_id });
          resolve({ url: result.secure_url, publicId: result.public_id });
        }
      );
      uploadStream.end(fileBuffer);
    });
  }

  async deleteImage(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId);
      logger.info('Profile image deleted from Cloudinary', { publicId });
    } catch (err) {
      logger.error('Cloudinary delete failed', { publicId, error: (err as Error).message });
    }
  }
}

export const cloudinaryService = new CloudinaryService();
