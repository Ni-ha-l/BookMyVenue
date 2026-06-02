import { FavoriteVenueModel, IFavoriteVenueDocument } from '../models/favoriteVenue.model';

export class FavoriteVenueRepository {
  async findAll(userId: string): Promise<IFavoriteVenueDocument[]> {
    return FavoriteVenueModel.find({ userId }).sort({ createdAt: -1 }).exec();
  }

  async findOne(userId: string, venueId: string): Promise<IFavoriteVenueDocument | null> {
    return FavoriteVenueModel.findOne({ userId, venueId }).exec();
  }

  async add(userId: string, venueId: string): Promise<IFavoriteVenueDocument> {
    return FavoriteVenueModel.create({ userId, venueId });
  }

  async remove(userId: string, venueId: string): Promise<boolean> {
    const result = await FavoriteVenueModel.deleteOne({ userId, venueId }).exec();
    return result.deletedCount === 1;
  }

  async countByUserId(userId: string): Promise<number> {
    return FavoriteVenueModel.countDocuments({ userId }).exec();
  }
}
