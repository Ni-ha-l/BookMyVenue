import mongoose, { Schema, Document, Model } from 'mongoose';
import { BookingStatus, CancelledBy } from '../interfaces';

export interface IBookingDocument extends Document {
  _id: mongoose.Types.ObjectId;
  userId: string;
  venueId: string;
  ownerId: string;
  bookingNumber: string;
  eventName: string;
  eventType: string;
  bookingDate: Date;
  startTime: string;
  endTime: string;
  guestCount: number;
  specialRequest?: string;
  totalAmount: number;
  status: BookingStatus;
  rejectionReason?: string;
  cancelledBy?: CancelledBy;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBookingDocument>(
  {
    userId: { type: String, required: true },
    venueId: { type: String, required: true },
    ownerId: { type: String, required: true },
    bookingNumber: { type: String, required: true, unique: true },
    eventName: { type: String, required: true, trim: true, maxlength: 200 },
    eventType: { type: String, required: true, trim: true, maxlength: 100 },
    bookingDate: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    guestCount: { type: Number, required: true, min: 1 },
    specialRequest: { type: String, trim: true, maxlength: 1000, default: undefined },
    totalAmount: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: Object.values(BookingStatus),
      default: BookingStatus.PENDING,
    },
    rejectionReason: { type: String, trim: true, maxlength: 500, default: undefined },
    cancelledBy: {
      type: String,
      enum: Object.values(CancelledBy),
      default: undefined,
    },
  },
  { timestamps: true }
);

BookingSchema.index({ userId: 1 });
BookingSchema.index({ venueId: 1 });
BookingSchema.index({ ownerId: 1 });
BookingSchema.index({ bookingDate: 1 });
BookingSchema.index({ status: 1 });
BookingSchema.index({ bookingNumber: 1 }, { unique: true });
BookingSchema.index({ userId: 1, status: 1 });
BookingSchema.index({ ownerId: 1, status: 1 });
BookingSchema.index({ venueId: 1, bookingDate: 1, status: 1 });

export const BookingModel: Model<IBookingDocument> =
  mongoose.model<IBookingDocument>('Booking', BookingSchema);
