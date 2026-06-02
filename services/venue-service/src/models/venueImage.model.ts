import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IVenueImageDocument extends Document {
  _id: mongoose.Types.ObjectId;
  venueId: mongoose.Types.ObjectId;
  imageUrl: string;
  cloudinaryPublicId: string;
  isPrimary: boolean;
  createdAt: Date;
}

const VenueImageSchema = new Schema<IVenueImageDocument>(
  {
    venueId: { type: Schema.Types.ObjectId, ref: 'Venue', required: true },
    imageUrl: { type: String, required: true },
    cloudinaryPublicId: { type: String, required: true },
    isPrimary: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

VenueImageSchema.index({ venueId: 1 });
VenueImageSchema.index({ venueId: 1, isPrimary: 1 });

export const VenueImageModel: Model<IVenueImageDocument> =
  mongoose.model<IVenueImageDocument>('VenueImage', VenueImageSchema);
