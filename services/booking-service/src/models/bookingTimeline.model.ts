import mongoose, { Schema, Document, Model } from 'mongoose';
import { BookingAction } from '../interfaces';

export interface IBookingTimelineDocument extends Document {
  _id: mongoose.Types.ObjectId;
  bookingId: mongoose.Types.ObjectId;
  action: BookingAction;
  performedBy: string;
  notes?: string;
  createdAt: Date;
}

const BookingTimelineSchema = new Schema<IBookingTimelineDocument>(
  {
    bookingId: { type: Schema.Types.ObjectId, ref: 'Booking', required: true },
    action: { type: String, enum: Object.values(BookingAction), required: true },
    performedBy: { type: String, required: true },
    notes: { type: String, trim: true, maxlength: 500, default: undefined },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

BookingTimelineSchema.index({ bookingId: 1, createdAt: 1 });

export const BookingTimelineModel: Model<IBookingTimelineDocument> =
  mongoose.model<IBookingTimelineDocument>('BookingTimeline', BookingTimelineSchema);
