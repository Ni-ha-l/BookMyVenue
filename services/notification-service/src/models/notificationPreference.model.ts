import mongoose, { Schema, Document, Model } from 'mongoose';

export interface INotificationPreferenceDocument extends Document {
  _id: mongoose.Types.ObjectId;
  userId: string;
  emailEnabled: boolean;
  pushEnabled: boolean;
  inAppEnabled: boolean;
  bookingNotifications: boolean;
  marketingNotifications: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationPreferenceSchema = new Schema<INotificationPreferenceDocument>(
  {
    userId: { type: String, required: true, unique: true },
    emailEnabled: { type: Boolean, default: true },
    pushEnabled: { type: Boolean, default: true },
    inAppEnabled: { type: Boolean, default: true },
    bookingNotifications: { type: Boolean, default: true },
    marketingNotifications: { type: Boolean, default: false },
  },
  { timestamps: true }
);

NotificationPreferenceSchema.index({ userId: 1 }, { unique: true });

export const NotificationPreferenceModel: Model<INotificationPreferenceDocument> =
  mongoose.model<INotificationPreferenceDocument>('NotificationPreference', NotificationPreferenceSchema);
