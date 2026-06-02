export enum Role {
  USER = 'USER',
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
}

export enum NotificationType {
  EMAIL = 'EMAIL',
  PUSH = 'PUSH',
  IN_APP = 'IN_APP',
}

export enum NotificationStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  FAILED = 'FAILED',
  READ = 'READ',
}

export enum DeviceType {
  ANDROID = 'ANDROID',
  IOS = 'IOS',
  WEB = 'WEB',
}

export enum NotificationEvent {
  BOOKING_CREATED = 'BOOKING_CREATED',
  BOOKING_CONFIRMED = 'BOOKING_CONFIRMED',
  BOOKING_REJECTED = 'BOOKING_REJECTED',
  BOOKING_CANCELLED = 'BOOKING_CANCELLED',
  BOOKING_COMPLETED = 'BOOKING_COMPLETED',
  VENUE_APPROVED = 'VENUE_APPROVED',
  VENUE_REJECTED = 'VENUE_REJECTED',
  OWNER_APPROVED = 'OWNER_APPROVED',
  PAYMENT_SUCCESS = 'PAYMENT_SUCCESS',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
}

export interface ITokenPayload {
  userId: string;
  role: Role;
}

// Payloads published by other services over RabbitMQ
export interface IBookingEventPayload {
  bookingId: string;
  bookingNumber: string;
  userId: string;
  userEmail: string;
  ownerId: string;
  ownerEmail: string;
  venueName: string;
  eventName: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  totalAmount: number;
  reason?: string;
}

export interface IVenueEventPayload {
  venueId: string;
  venueName: string;
  ownerId: string;
  ownerEmail: string;
  reason?: string;
}

export interface IOwnerApprovedPayload {
  ownerId: string;
  ownerEmail: string;
  ownerName: string;
}

export interface IPaymentEventPayload {
  userId: string;
  userEmail: string;
  bookingId: string;
  bookingNumber: string;
  amount: number;
  reason?: string;
}

export interface ISendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

export interface ISendPushOptions {
  fcmToken: string;
  title: string;
  body: string;
  data?: Record<string, string>;
}

export interface ICreateNotificationOptions {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, unknown>;
}

export interface IPaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
