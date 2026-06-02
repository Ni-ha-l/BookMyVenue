export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_ERROR: 500,
} as const;

export const ERROR_MESSAGES = {
  BOOKING_NOT_FOUND: 'Booking not found',
  BOOKING_NOT_OWNED: 'You are not authorised to perform this action on this booking',
  INVALID_STATUS_TRANSITION: 'Invalid booking status transition',
  VENUE_NOT_FOUND: 'Venue not found or unavailable',
  VENUE_NOT_APPROVED: 'Venue is not approved for bookings',
  SLOT_NOT_AVAILABLE: 'The requested time slot is not available',
  DUPLICATE_BOOKING: 'A booking for this slot already exists',
  BOOKING_NOT_CANCELLABLE: 'This booking cannot be cancelled in its current state',
  BOOKING_NOT_CONFIRMABLE: 'This booking cannot be confirmed in its current state',
  BOOKING_NOT_REJECTABLE: 'This booking cannot be rejected in its current state',
  BOOKING_NOT_COMPLETABLE: 'This booking cannot be completed in its current state',
  INVALID_TIME_RANGE: 'End time must be after start time',
  INVALID_DATE: 'Booking date must be in the future',
  INVALID_TOKEN: 'Invalid or expired token',
  TOKEN_REQUIRED: 'Authentication token required',
  FORBIDDEN: 'Insufficient permissions',
  VALIDATION_ERROR: 'Validation failed',
  INVALID_OBJECT_ID: 'Invalid ID format',
} as const;

export const SUCCESS_MESSAGES = {
  BOOKING_CREATED: 'Booking created successfully',
  BOOKING_FETCHED: 'Booking fetched successfully',
  BOOKINGS_FETCHED: 'Bookings fetched successfully',
  BOOKING_CONFIRMED: 'Booking confirmed successfully',
  BOOKING_REJECTED: 'Booking rejected successfully',
  BOOKING_CANCELLED: 'Booking cancelled successfully',
  BOOKING_COMPLETED: 'Booking completed successfully',
  DASHBOARD_FETCHED: 'Dashboard fetched successfully',
} as const;

export const REDIS_KEYS = {
  booking: (id: string) => `booking:${id}`,
  userBookings: (userId: string) => `bookings:user:${userId}`,
  ownerBookings: (ownerId: string) => `bookings:owner:${ownerId}`,
  userDashboard: (userId: string) => `dashboard:user:${userId}`,
  ownerDashboard: (ownerId: string) => `dashboard:owner:${ownerId}`,
  idempotency: (key: string) => `idempotency:${key}`,
} as const;

export const CACHE_TTL = {
  BOOKING: 300,
  BOOKINGS_LIST: 60,
  DASHBOARD: 120,
  IDEMPOTENCY: 86400, // 24h
} as const;

export const BOOKING_NUMBER_PREFIX = 'BMV';
