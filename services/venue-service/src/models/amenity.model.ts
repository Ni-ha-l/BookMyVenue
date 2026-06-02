import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAmenityDocument extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  icon: string;
}

const AmenitySchema = new Schema<IAmenityDocument>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    icon: { type: String, required: true, trim: true },
  },
  { timestamps: false }
);

AmenitySchema.index({ name: 1 }, { unique: true });

export const AmenityModel: Model<IAmenityDocument> =
  mongoose.model<IAmenityDocument>('Amenity', AmenitySchema);
