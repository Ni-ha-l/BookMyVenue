import mongoose, { Schema, Document, Model } from 'mongoose';
import { ReportType, ReportFormat } from '../interfaces';

export interface IAdminReportDocument extends Document {
  _id: mongoose.Types.ObjectId;
  reportType: ReportType;
  format: ReportFormat;
  generatedBy: string;
  filters: Record<string, unknown>;
  recordCount: number;
  createdAt: Date;
}

const AdminReportSchema = new Schema<IAdminReportDocument>(
  {
    reportType: { type: String, enum: Object.values(ReportType), required: true },
    format: { type: String, enum: Object.values(ReportFormat), required: true },
    generatedBy: { type: String, required: true },
    filters: { type: Schema.Types.Mixed, default: {} },
    recordCount: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

AdminReportSchema.index({ generatedBy: 1 });
AdminReportSchema.index({ reportType: 1 });
AdminReportSchema.index({ createdAt: -1 });

export const AdminReportModel: Model<IAdminReportDocument> =
  mongoose.model<IAdminReportDocument>('AdminReport', AdminReportSchema);
