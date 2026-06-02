import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IVenueCategoryDocument extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  icon: string;
  description: string;
}

const VenueCategorySchema = new Schema<IVenueCategoryDocument>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    icon: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
  },
  { timestamps: false }
);

VenueCategorySchema.index({ name: 1 }, { unique: true });

export const VenueCategoryModel: Model<IVenueCategoryDocument> =
  mongoose.model<IVenueCategoryDocument>('VenueCategory', VenueCategorySchema);
