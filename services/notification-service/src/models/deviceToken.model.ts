import mongoose, { Schema, Document, Model } from 'mongoose';
import { DeviceType } from '../interfaces';

export interface IDeviceTokenDocument extends Document {
  _id: mongoose.Types.ObjectId;
  userId: string;
  fcmToken: string;
  deviceType: DeviceType;
  createdAt: Date;
  updatedAt: Date;
}

const DeviceTokenSchema = new Schema<IDeviceTokenDocument>(
  {
    userId: { type: String, required: true },
    fcmToken: { type: String, required: true },
    deviceType: { type: String, enum: Object.values(DeviceType), required: true },
  },
  { timestamps: true }
);

DeviceTokenSchema.index({ userId: 1 });
DeviceTokenSchema.index({ fcmToken: 1 }, { unique: true });

export const DeviceTokenModel: Model<IDeviceTokenDocument> =
  mongoose.model<IDeviceTokenDocument>('DeviceToken', DeviceTokenSchema);
