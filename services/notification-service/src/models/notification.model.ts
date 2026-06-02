import mongoose, { Schema, Document, Model } from 'mongoose';
import { NotificationType, NotificationStatus } from '../interfaces';

export interface INotificationDocument extends Document {
  _id: mongoose.Types.ObjectId;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  status: NotificationStatus;
  data?: Record<string, unknown>;
  readAt?: Date;
  sentAt?: Date;
  retryCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema = new Schema<INotificationDocument>(
  {
    userId: { type: String, required: true },
    type: { type: String, enum: Object.values(NotificationType), required: true },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
    status: { type: String, enum: Object.values(NotificationStatus), default: NotificationStatus.PENDING },
    data: { type: Schema.Types.Mixed, default: undefined },
    readAt: { type: Date, default: undefined },
    sentAt: { type: Date, default: undefined },
    retryCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

NotificationSchema.index({ userId: 1, createdAt: -1 });
NotificationSchema.index({ type: 1 });
NotificationSchema.index({ status: 1 });
NotificationSchema.index({ userId: 1, status: 1 });
NotificationSchema.index({ createdAt: -1 });

export const NotificationModel: Model<INotificationDocument> =
  mongoose.model<INotificationDocument>('Notification', NotificationSchema);
