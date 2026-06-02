import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOtpDocument extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  otpHash: string;
  expiresAt: Date;
}

const OtpSchema = new Schema<IOtpDocument>({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User', unique: true },
  otpHash: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

// MongoDB TTL index — automatically removes expired OTP documents
OtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const OtpModel: Model<IOtpDocument> = mongoose.model<IOtpDocument>('OtpRecord', OtpSchema);
