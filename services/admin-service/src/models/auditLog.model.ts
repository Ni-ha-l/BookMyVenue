import mongoose, { Schema, Document, Model } from 'mongoose';
import { AuditTargetType } from '../interfaces';

export interface IAuditLogDocument extends Document {
  _id: mongoose.Types.ObjectId;
  adminId: string;
  action: string;
  targetType: AuditTargetType;
  targetId: string;
  description: string;
  metadata: Record<string, unknown>;
  createdAt: Date;
}

const AuditLogSchema = new Schema<IAuditLogDocument>(
  {
    adminId: { type: String, required: true },
    action: { type: String, required: true, trim: true },
    targetType: { type: String, enum: Object.values(AuditTargetType), required: true },
    targetId: { type: String, required: true },
    description: { type: String, required: true, trim: true, maxlength: 500 },
    metadata: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

AuditLogSchema.index({ adminId: 1 });
AuditLogSchema.index({ targetType: 1 });
AuditLogSchema.index({ targetId: 1 });
AuditLogSchema.index({ createdAt: -1 });
AuditLogSchema.index({ adminId: 1, createdAt: -1 });

export const AuditLogModel: Model<IAuditLogDocument> =
  mongoose.model<IAuditLogDocument>('AuditLog', AuditLogSchema);
