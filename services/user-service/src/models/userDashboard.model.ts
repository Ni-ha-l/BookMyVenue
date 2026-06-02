import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUserDashboardDocument extends Document {
  _id: mongoose.Types.ObjectId;
  userId: string;
  totalBookings: number;
  upcomingBookings: number;
  completedBookings: number;
  favoriteVenueCount: number;
  updatedAt: Date;
}

const UserDashboardSchema = new Schema<IUserDashboardDocument>(
  {
    userId: { type: String, required: true, unique: true },
    totalBookings: { type: Number, default: 0 },
    upcomingBookings: { type: Number, default: 0 },
    completedBookings: { type: Number, default: 0 },
    favoriteVenueCount: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: false, updatedAt: true } }
);

UserDashboardSchema.index({ userId: 1 }, { unique: true });

export const UserDashboardModel: Model<IUserDashboardDocument> =
  mongoose.model<IUserDashboardDocument>('UserDashboard', UserDashboardSchema);
