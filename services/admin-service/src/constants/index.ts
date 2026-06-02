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
  USER_NOT_FOUND: 'User not found',
  VENUE_NOT_FOUND: 'Venue not found',
  BOOKING_NOT_FOUND: 'Booking not found',
  ALREADY_ACTIVE: 'User is already active',
  ALREADY_SUSPENDED: 'User is already suspended',
  ALREADY_APPROVED: 'Already approved',
  ALREADY_REJECTED: 'Already rejected',
  INVALID_TOKEN: 'Invalid or expired token',
  TOKEN_REQUIRED: 'Authentication token required',
  FORBIDDEN: 'Admin access required',
  VALIDATION_ERROR: 'Validation failed',
  INVALID_OBJECT_ID: 'Invalid ID format',
  SETTINGS_NOT_FOUND: 'System settings not found',
  SERVICE_UNAVAILABLE: 'Downstream service unavailable',
} as const;

export const SUCCESS_MESSAGES = {
  USERS_FETCHED: 'Users fetched successfully',
  USER_FETCHED: 'User fetched successfully',
  USER_SUSPENDED: 'User suspended successfully',
  USER_ACTIVATED: 'User activated successfully',
  USER_DELETED: 'User deleted successfully',
  OWNERS_FETCHED: 'Owners fetched successfully',
  OWNER_APPROVED: 'Owner approved successfully',
  OWNER_REJECTED: 'Owner rejected successfully',
  VENUES_FETCHED: 'Venues fetched successfully',
  VENUE_APPROVED: 'Venue approved successfully',
  VENUE_REJECTED: 'Venue rejected successfully',
  VENUE_FEATURED: 'Venue featured successfully',
  VENUE_UNFEATURED: 'Venue unfeatured successfully',
  BOOKINGS_FETCHED: 'Bookings fetched successfully',
  BOOKING_FETCHED: 'Booking fetched successfully',
  BOOKING_CANCELLED: 'Booking cancelled successfully',
  DASHBOARD_FETCHED: 'Dashboard fetched successfully',
  SETTINGS_FETCHED: 'Settings fetched successfully',
  SETTINGS_UPDATED: 'Settings updated successfully',
  REPORT_GENERATED: 'Report generated successfully',
  AUDIT_LOGS_FETCHED: 'Audit logs fetched successfully',
} as const;

export const REDIS_KEYS = {
  dashboard: () => 'admin:dashboard',
  pendingCounts: () => 'admin:pending_counts',
  settings: () => 'admin:settings',
} as const;

export const CACHE_TTL = {
  DASHBOARD: 120,   // 2 min
  PENDING: 60,      // 1 min
  SETTINGS: 300,    // 5 min
} as const;

export const AUDIT_ACTIONS = {
  USER_SUSPENDED: 'USER_SUSPENDED',
  USER_ACTIVATED: 'USER_ACTIVATED',
  USER_DELETED: 'USER_DELETED',
  OWNER_APPROVED: 'OWNER_APPROVED',
  OWNER_REJECTED: 'OWNER_REJECTED',
  VENUE_APPROVED: 'VENUE_APPROVED',
  VENUE_REJECTED: 'VENUE_REJECTED',
  VENUE_FEATURED: 'VENUE_FEATURED',
  VENUE_UNFEATURED: 'VENUE_UNFEATURED',
  BOOKING_CANCELLED: 'BOOKING_CANCELLED_BY_ADMIN',
  SETTINGS_UPDATED: 'SETTINGS_UPDATED',
  REPORT_GENERATED: 'REPORT_GENERATED',
} as const;
