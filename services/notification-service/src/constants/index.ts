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
  NOTIFICATION_NOT_FOUND: 'Notification not found',
  DEVICE_TOKEN_EXISTS: 'Device token already registered',
  INVALID_TOKEN: 'Invalid or expired token',
  TOKEN_REQUIRED: 'Authentication token required',
  FORBIDDEN: 'Insufficient permissions',
  VALIDATION_ERROR: 'Validation failed',
  EMAIL_SEND_FAILED: 'Failed to send email',
  PUSH_SEND_FAILED: 'Failed to send push notification',
  INVALID_OBJECT_ID: 'Invalid ID format',
} as const;

export const SUCCESS_MESSAGES = {
  NOTIFICATIONS_FETCHED: 'Notifications fetched successfully',
  NOTIFICATION_READ: 'Notification marked as read',
  ALL_NOTIFICATIONS_READ: 'All notifications marked as read',
  NOTIFICATION_DELETED: 'Notification deleted successfully',
  DEVICE_TOKEN_REGISTERED: 'Device token registered successfully',
  PREFERENCES_FETCHED: 'Preferences fetched successfully',
  PREFERENCES_UPDATED: 'Preferences updated successfully',
} as const;

export const REDIS_KEYS = {
  preferences: (userId: string) => `notif:preferences:${userId}`,
  unreadCount: (userId: string) => `notif:unread:${userId}`,
  recent: (userId: string) => `notif:recent:${userId}`,
} as const;

export const CACHE_TTL = {
  PREFERENCES: 300,
  UNREAD_COUNT: 60,
  RECENT: 60,
} as const;

export const EMAIL_SUBJECTS: Record<string, string> = {
  BOOKING_CREATED: 'Your Booking Request Has Been Received',
  BOOKING_CONFIRMED: 'Your Booking Has Been Confirmed! 🎉',
  BOOKING_REJECTED: 'Booking Request Update',
  BOOKING_CANCELLED: 'Booking Cancellation Notice',
  BOOKING_COMPLETED: 'Thank You for Using BookMyVenue',
  VENUE_APPROVED: 'Your Venue Has Been Approved! 🎊',
  VENUE_REJECTED: 'Venue Listing Update',
  OWNER_APPROVED: 'Welcome Aboard — Your Owner Account Is Approved',
  PAYMENT_SUCCESS: 'Payment Confirmed ✅',
  PAYMENT_FAILED: 'Payment Failed — Action Required',
};

export const PUSH_TITLES: Record<string, string> = {
  BOOKING_CREATED: 'Booking Received',
  BOOKING_CONFIRMED: 'Booking Confirmed 🎉',
  BOOKING_REJECTED: 'Booking Update',
  BOOKING_CANCELLED: 'Booking Cancelled',
  BOOKING_COMPLETED: 'Booking Completed',
  VENUE_APPROVED: 'Venue Approved 🎊',
  VENUE_REJECTED: 'Venue Update',
  OWNER_APPROVED: 'Account Approved',
  PAYMENT_SUCCESS: 'Payment Successful ✅',
  PAYMENT_FAILED: 'Payment Failed',
};
