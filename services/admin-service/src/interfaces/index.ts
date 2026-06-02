export enum Role {
  USER = 'USER',
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  SUSPENDED = 'SUSPENDED',
  REJECTED = 'REJECTED',
}

export enum VenueStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

export enum AuditTargetType {
  USER = 'USER',
  OWNER = 'OWNER',
  VENUE = 'VENUE',
  BOOKING = 'BOOKING',
  SETTINGS = 'SETTINGS',
}

export enum ReportType {
  USERS = 'USERS',
  BOOKINGS = 'BOOKINGS',
  VENUES = 'VENUES',
}

export enum ReportFormat {
  CSV = 'CSV',
  JSON = 'JSON',
}

export interface ITokenPayload {
  userId: string;
  role: Role;
}

export interface IPlatformDashboard {
  totalUsers: number;
  totalOwners: number;
  totalVenues: number;
  totalBookings: number;
  pendingVenues: number;
  pendingOwners: number;
  totalRevenue: number;
}

export interface IPaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Payloads received from other services via RabbitMQ
export interface IBookingCreatedPayload {
  bookingId: string;
  bookingNumber: string;
  userId: string;
  ownerId: string;
  venueId: string;
  totalAmount: number;
  bookingDate: string;
}

export interface IPaymentSuccessPayload {
  bookingId: string;
  userId: string;
  amount: number;
}
