import { VenueCategoryModel, IVenueCategoryDocument } from '../models/venueCategory.model';

export class CategoryRepository {
  async findAll(): Promise<IVenueCategoryDocument[]> {
    return VenueCategoryModel.find().sort({ name: 1 }).exec();
  }

  async findByName(name: string): Promise<IVenueCategoryDocument | null> {
    return VenueCategoryModel.findOne({ name: new RegExp(`^${name}$`, 'i') }).exec();
  }

  async seed(categories: { name: string; icon: string; description: string }[]): Promise<void> {
    await Promise.all(
      categories.map((cat) =>
        VenueCategoryModel.findOneAndUpdate(
          { name: cat.name },
          { $setOnInsert: cat },
          { upsert: true }
        ).exec()
      )
    );
  }
}
