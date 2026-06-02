import mongoose, { Schema, Document, Model } from 'mongoose';
import { VenueStatus } from '../interfaces';

export interface IVenueDocument extends Document {
  _id: mongoose.Types.ObjectId;
  ownerId: string;
  venueName: string;
  description: string;
  category: string;
  pricePerHour: number;
  maxCapacity: number;
  address: string;
  city: string;
  state: string;
  country: string;
  location: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
  amenities: string[];
  images: string[];
  status: VenueStatus;
  isFeatured: boolean;
  isDeleted: boolean;
  averageRating: number;
  totalReviews: number;
  createdAt: Date;
  updatedAt: Date;
}

const VenueSchema = new Schema<IVenueDocument>(
  {
    ownerId: { type: String, required: true },
    venueName: { type: String, required: true, trim: true, maxlength: 100 },
    description: { type: String, required: true, trim: true, maxlength: 2000 },
    category: { type: String, required: true, trim: true },
    pricePerHour: { type: Number, required: true, min: 0 },
    maxCapacity: { type: Number, required: true, min: 1 },
    address: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    amenities: { type: [String], default: [] },
    images: { type: [String], default: [] },
    status: { type: String, enum: Object.values(VenueStatus), default: VenueStatus.PENDING },
    isFeatured: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    averageRating: { type: Number, default: 0, min: 0, max: 5 },
    totalReviews: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

// Indexes
VenueSchema.index({ ownerId: 1 });
VenueSchema.index({ category: 1 });
VenueSchema.index({ city: 1 });
VenueSchema.index({ status: 1 });
VenueSchema.index({ isFeatured: 1 });
VenueSchema.index({ isDeleted: 1 });
VenueSchema.index({ location: '2dsphere' });
VenueSchema.index({ venueName: 'text', description: 'text', city: 'text', category: 'text' });
VenueSchema.index({ status: 1, isDeleted: 1, isFeatured: 1 });

export const VenueModel: Model<IVenueDocument> =
  mongoose.model<IVenueDocument>('Venue', VenueSchema);
