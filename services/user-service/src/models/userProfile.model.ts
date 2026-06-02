import mongoose, { Schema, Document, Model } from 'mongoose';
import { Gender } from '../interfaces';

export interface IUserProfileDocument extends Document {
  _id: mongoose.Types.ObjectId;
  userId: string;
  firstName: string;
  lastName: string;
  phone?: string;
  profileImage?: string;
  cloudinaryPublicId?: string;
  gender?: Gender;
  dateOfBirth?: Date;
  city?: string;
  state?: string;
  country?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserProfileSchema = new Schema<IUserProfileDocument>(
  {
    userId: { type: String, required: true, unique: true },
    firstName: { type: String, required: true, trim: true, maxlength: 50 },
    lastName: { type: String, required: true, trim: true, maxlength: 50 },
    phone: { type: String, trim: true, default: undefined },
    profileImage: { type: String, default: undefined },
    cloudinaryPublicId: { type: String, default: undefined },
    gender: { type: String, enum: Object.values(Gender), default: undefined },
    dateOfBirth: { type: Date, default: undefined },
    city: { type: String, trim: true, maxlength: 100, default: undefined },
    state: { type: String, trim: true, maxlength: 100, default: undefined },
    country: { type: String, trim: true, maxlength: 100, default: undefined },
    bio: { type: String, trim: true, maxlength: 500, default: undefined },
  },
  { timestamps: true }
);

UserProfileSchema.index({ userId: 1 }, { unique: true });
UserProfileSchema.index({ phone: 1 });

export const UserProfileModel: Model<IUserProfileDocument> =
  mongoose.model<IUserProfileDocument>('UserProfile', UserProfileSchema);
