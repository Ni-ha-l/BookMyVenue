import { ReportFormat, ReportType } from '../interfaces';

export interface RejectOwnerDTO {
  reason: string;
}

export interface RejectVenueDTO {
  reason: string;
}

export interface CancelBookingDTO {
  reason: string;
}

export interface UpdateSettingsDTO {
  bookingCommissionPercentage?: number;
  ownerApprovalRequired?: boolean;
  venueApprovalRequired?: boolean;
  maintenanceMode?: boolean;
}

export interface GenerateReportDTO {
  type: ReportType;
  format: ReportFormat;
  startDate?: string;
  endDate?: string;
  filters?: Record<string, unknown>;
}

export interface AdminQueryDTO {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  startDate?: string;
  endDate?: string;
}
