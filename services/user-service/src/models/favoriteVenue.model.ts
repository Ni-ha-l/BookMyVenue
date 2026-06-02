import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IFavoriteVenueDocument extends Document {
  _id: mongoose.Types.ObjectId;
  userId: string;
  venueId: string;
  createdAt: Date;
}

const FavoriteVenueSchema = new Schema<IFavoriteVenueDocument>(
  {
    userId: { type: String, required: true },
    venueId: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

FavoriteVenueSchema.index({ userId: 1 });
FavoriteVenueSchema.index({ venueId: 1 });
FavoriteVenueSchema.index({ userId: 1, venueId: 1 }, { unique: true });

export const FavoriteVenueModel: Model<IFavoriteVenueDocument> =
  mongoose.model<IFavoriteVenueDocument>('FavoriteVenue', FavoriteVenueSchema);
