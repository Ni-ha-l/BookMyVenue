import { AmenityModel, IAmenityDocument } from '../models/amenity.model';

export class AmenityRepository {
  async findAll(): Promise<IAmenityDocument[]> {
    return AmenityModel.find().sort({ name: 1 }).exec();
  }

  async seed(amenities: { name: string; icon: string }[]): Promise<void> {
    await Promise.all(
      amenities.map((a) =>
        AmenityModel.findOneAndUpdate(
          { name: a.name },
          { $setOnInsert: a },
          { upsert: true }
        ).exec()
      )
    );
  }
}
