import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISystemSettingsDocument extends Document {
  _id: mongoose.Types.ObjectId;
  bookingCommissionPercentage: number;
  ownerApprovalRequired: boolean;
  venueApprovalRequired: boolean;
  maintenanceMode: boolean;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const SystemSettingsSchema = new Schema<ISystemSettingsDocument>(
  {
    bookingCommissionPercentage: { type: Number, required: true, min: 0, max: 100, default: 10 },
    ownerApprovalRequired: { type: Boolean, default: true },
    venueApprovalRequired: { type: Boolean, default: true },
    maintenanceMode: { type: Boolean, default: false },
    updatedBy: { type: String, required: true },
  },
  { timestamps: true }
);

export const SystemSettingsModel: Model<ISystemSettingsDocument> =
  mongoose.model<ISystemSettingsDocument>('SystemSettings', SystemSettingsSchema);
