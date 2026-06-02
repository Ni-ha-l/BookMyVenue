import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUserPreferenceDocument extends Document {
  _id: mongoose.Types.ObjectId;
  userId: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserPreferenceSchema = new Schema<IUserPreferenceDocument>(
  {
    userId: { type: String, required: true, unique: true },
    emailNotifications: { type: Boolean, default: true },
    pushNotifications: { type: Boolean, default: true },
    marketingEmails: { type: Boolean, default: false },
  },
  { timestamps: true }
);

UserPreferenceSchema.index({ userId: 1 }, { unique: true });

export const UserPreferenceModel: Model<IUserPreferenceDocument> =
  mongoose.model<IUserPreferenceDocument>('UserPreference', UserPreferenceSchema);
