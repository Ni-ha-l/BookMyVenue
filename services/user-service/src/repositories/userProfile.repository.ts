import { UserProfileModel, IUserProfileDocument } from '../models/userProfile.model';
import { CreateProfileDTO, UpdateProfileDTO } from '../dto/profile.dto';

export class UserProfileRepository {
  async findByUserId(userId: string): Promise<IUserProfileDocument | null> {
    return UserProfileModel.findOne({ userId }).exec();
  }

  async create(userId: string, dto: CreateProfileDTO): Promise<IUserProfileDocument> {
    return UserProfileModel.create({ userId, ...dto });
  }

  async update(userId: string, dto: UpdateProfileDTO): Promise<IUserProfileDocument | null> {
    return UserProfileModel.findOneAndUpdate(
      { userId },
      { $set: dto },
      { new: true, runValidators: true }
    ).exec();
  }

  async updateImage(
    userId: string,
    profileImage: string,
    cloudinaryPublicId: string
  ): Promise<IUserProfileDocument | null> {
    return UserProfileModel.findOneAndUpdate(
      { userId },
      { $set: { profileImage, cloudinaryPublicId } },
      { new: true }
    ).exec();
  }

  async removeImage(userId: string): Promise<IUserProfileDocument | null> {
    return UserProfileModel.findOneAndUpdate(
      { userId },
      { $unset: { profileImage: '', cloudinaryPublicId: '' } },
      { new: true }
    ).exec();
  }
}
