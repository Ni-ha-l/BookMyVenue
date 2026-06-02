import mongoose, { Schema, Document, Model } from 'mongoose';
import { Role, Status } from '../interfaces';

export interface IOwnerProfileDocument {
  businessName: string;
  ownerName: string;
  phone: string;
  address: string;
}

export interface IUserDocument extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  role: Role;
  status: Status;
  isVerified: boolean;
  refreshToken: string | null;
  ownerProfile?: IOwnerProfileDocument;
  createdAt: Date;
  updatedAt: Date;
}

const OwnerProfileSchema = new Schema<IOwnerProfileDocument>(
  {
    businessName: { type: String, required: true, trim: true },
    ownerName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const UserSchema = new Schema<IUserDocument>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(Role), default: Role.USER },
    status: { type: String, enum: Object.values(Status), default: Status.ACTIVE },
    isVerified: { type: Boolean, default: false },
    refreshToken: { type: String, default: null },
    ownerProfile: { type: OwnerProfileSchema, default: undefined },
  },
  { timestamps: true }
);

UserSchema.index({ email: 1 });

export const UserModel: Model<IUserDocument> = mongoose.model<IUserDocument>('User', UserSchema);
