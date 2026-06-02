import cloudinary from '../config/cloudinary';
import { CLOUDINARY_VENUE_FOLDER } from '../constants';
import { AppError } from '../utils/AppError';
import { HTTP_STATUS, ERROR_MESSAGES } from '../constants';
import { logger } from '../utils/logger';

export interface IUploadResult {
  url: string;
  publicId: string;
}

export class CloudinaryService {
  async uploadImage(fileBuffer: Buffer, venueId: string, index: number): Promise<IUploadResult> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: CLOUDINARY_VENUE_FOLDER,
          public_id: `venue_${venueId}_${index}_${Date.now()}`,
          transformation: [{ width: 1200, height: 800, crop: 'fill', quality: 'auto:good' }],
        },
        (error, result) => {
          if (error || !result) {
            logger.error('Cloudinary upload failed', { venueId, error });
            return reject(new AppError(ERROR_MESSAGES.IMAGE_UPLOAD_FAILED, HTTP_STATUS.INTERNAL_ERROR));
          }
          resolve({ url: result.secure_url, publicId: result.public_id });
        }
      );
      uploadStream.end(fileBuffer);
    });
  }

  async deleteImage(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId);
      logger.info('Venue image deleted from Cloudinary', { publicId });
    } catch (err) {
      logger.error('Cloudinary delete failed', { publicId, error: (err as Error).message });
    }
  }
}

export const cloudinaryService = new CloudinaryService();
