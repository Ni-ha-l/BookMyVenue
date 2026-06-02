import { UserPreferenceModel, IUserPreferenceDocument } from '../models/userPreference.model';
import { UpdatePreferencesDTO } from '../dto/profile.dto';

export class UserPreferenceRepository {
  async findByUserId(userId: string): Promise<IUserPreferenceDocument | null> {
    return UserPreferenceModel.findOne({ userId }).exec();
  }

  async upsert(userId: string, dto: UpdatePreferencesDTO): Promise<IUserPreferenceDocument> {
    return UserPreferenceModel.findOneAndUpdate(
      { userId },
      { $set: dto },
      { new: true, upsert: true, runValidators: true }
    ).exec() as Promise<IUserPreferenceDocument>;
  }

  async createDefault(userId: string): Promise<IUserPreferenceDocument> {
    return UserPreferenceModel.create({ userId });
  }
}
