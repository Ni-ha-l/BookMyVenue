import mongoose from 'mongoose';
import { VenueImageModel, IVenueImageDocument } from '../models/venueImage.model';

export class VenueImageRepository {
  async create(
    venueId: string,
    imageUrl: string,
    cloudinaryPublicId: string,
    isPrimary = false
  ): Promise<IVenueImageDocument> {
    return VenueImageModel.create({
      venueId: new mongoose.Types.ObjectId(venueId),
      imageUrl,
      cloudinaryPublicId,
      isPrimary,
    });
  }

  async findByVenueId(venueId: string): Promise<IVenueImageDocument[]> {
    return VenueImageModel.find({ venueId: new mongoose.Types.ObjectId(venueId) })
      .sort({ isPrimary: -1, createdAt: 1 })
      .exec();
  }

  async findById(id: string): Promise<IVenueImageDocument | null> {
    if (!mongoose.isValidObjectId(id)) return null;
    return VenueImageModel.findById(id).exec();
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await VenueImageModel.findByIdAndDelete(id).exec();
    return result !== null;
  }

  async countByVenueId(venueId: string): Promise<number> {
    return VenueImageModel.countDocuments({ venueId: new mongoose.Types.ObjectId(venueId) }).exec();
  }

  async setPrimary(venueId: string, imageId: string): Promise<void> {
    // Reset all to non-primary
    await VenueImageModel.updateMany(
      { venueId: new mongoose.Types.ObjectId(venueId) },
      { $set: { isPrimary: false } }
    ).exec();
    // Set the specified one as primary
    await VenueImageModel.findByIdAndUpdate(imageId, { $set: { isPrimary: true } }).exec();
  }
}
