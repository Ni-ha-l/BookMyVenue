export enum Role {
  USER = 'USER',
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
}

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

export enum CancelledBy {
  USER = 'USER',
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
}

export enum BookingAction {
  BOOKING_CREATED = 'BOOKING_CREATED',
  BOOKING_CONFIRMED = 'BOOKING_CONFIRMED',
  BOOKING_REJECTED = 'BOOKING_REJECTED',
  BOOKING_CANCELLED = 'BOOKING_CANCELLED',
  BOOKING_COMPLETED = 'BOOKING_COMPLETED',
}

export interface ITokenPayload {
  userId: string;
  role: Role;
}

export interface IVenueDetails {
  _id: string;
  ownerId: string;
  venueName: string;
  pricePerHour: number;
  maxCapacity: number;
  status: string;
}

export interface IAvailabilityCheck {
  venueId: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
}

export interface IAvailabilityResult {
  available: boolean;
  reason?: string;
}

export interface IUserDashboard {
  totalBookings: number;
  upcomingBookings: number;
  completedBookings: number;
  cancelledBookings: number;
}

export interface IOwnerDashboard {
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  revenue: number;
}

export interface IPaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IBookingEvent {
  bookingId: string;
  bookingNumber: string;
  userId: string;
  venueId: string;
  ownerId: string;
  eventName: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  totalAmount: number;
  status: BookingStatus;
  reason?: string;
}
