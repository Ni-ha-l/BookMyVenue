export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
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
  PROFILE_NOT_FOUND: 'User profile not found',
  PROFILE_EXISTS: 'Profile already exists for this user',
  INVALID_TOKEN: 'Invalid or expired token',
  TOKEN_REQUIRED: 'Authentication token required',
  FORBIDDEN: 'Insufficient permissions',
  VALIDATION_ERROR: 'Validation failed',
  VENUE_ALREADY_FAVORITED: 'Venue is already in favorites',
  VENUE_NOT_IN_FAVORITES: 'Venue not found in favorites',
  IMAGE_UPLOAD_FAILED: 'Profile image upload failed',
  IMAGE_NOT_FOUND: 'No profile image to delete',
  INVALID_FILE_TYPE: 'Only JPEG, PNG and WEBP images are allowed',
  FILE_TOO_LARGE: 'Image must be under 5MB',
} as const;

export const SUCCESS_MESSAGES = {
  PROFILE_FETCHED: 'Profile fetched successfully',
  PROFILE_CREATED: 'Profile created successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
  IMAGE_UPLOADED: 'Profile image uploaded successfully',
  IMAGE_DELETED: 'Profile image deleted successfully',
  FAVORITE_ADDED: 'Venue added to favorites',
  FAVORITE_REMOVED: 'Venue removed from favorites',
  FAVORITES_FETCHED: 'Favorites fetched successfully',
  PREFERENCES_FETCHED: 'Preferences fetched successfully',
  PREFERENCES_UPDATED: 'Preferences updated successfully',
  DASHBOARD_FETCHED: 'Dashboard fetched successfully',
} as const;

export const REDIS_KEYS = {
  profile: (userId: string) => `user:profile:${userId}`,
  dashboard: (userId: string) => `user:dashboard:${userId}`,
  preferences: (userId: string) => `user:preferences:${userId}`,
} as const;

export const CACHE_TTL = {
  PROFILE: 300,    // 5 minutes
  DASHBOARD: 60,   // 1 minute
  PREFERENCES: 300,
} as const;

export const CLOUDINARY_FOLDER = 'bookmyvenue/profile-images';
export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
export const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
