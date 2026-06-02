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
  VENUE_NOT_FOUND: 'Venue not found',
  VENUE_NOT_OWNED: 'You do not own this venue',
  VENUE_ALREADY_APPROVED: 'Venue is already approved',
  VENUE_ALREADY_REJECTED: 'Venue is already rejected',
  VENUE_NOT_APPROVED: 'Venue is not approved for this operation',
  IMAGE_NOT_FOUND: 'Image not found',
  IMAGE_LIMIT_REACHED: 'Maximum image limit reached for this venue',
  IMAGE_UPLOAD_FAILED: 'Image upload failed',
  INVALID_COORDINATES: 'Invalid latitude or longitude',
  INVALID_OBJECT_ID: 'Invalid ID format',
  INVALID_TOKEN: 'Invalid or expired token',
  TOKEN_REQUIRED: 'Authentication token required',
  FORBIDDEN: 'Insufficient permissions',
  VALIDATION_ERROR: 'Validation failed',
  INVALID_FILE_TYPE: 'Only JPEG, PNG and WEBP images are allowed',
  FILE_TOO_LARGE: 'Each image must be under 5MB',
  CATEGORY_NOT_FOUND: 'Category not found',
} as const;

export const SUCCESS_MESSAGES = {
  VENUE_CREATED: 'Venue created successfully. Awaiting admin approval.',
  VENUE_UPDATED: 'Venue updated successfully',
  VENUE_DELETED: 'Venue deleted successfully',
  VENUE_FETCHED: 'Venue fetched successfully',
  VENUES_FETCHED: 'Venues fetched successfully',
  VENUE_APPROVED: 'Venue approved successfully',
  VENUE_REJECTED: 'Venue rejected successfully',
  VENUE_FEATURED: 'Venue featured status toggled successfully',
  IMAGE_UPLOADED: 'Images uploaded successfully',
  IMAGE_DELETED: 'Image deleted successfully',
  CATEGORIES_FETCHED: 'Categories fetched successfully',
  AMENITIES_FETCHED: 'Amenities fetched successfully',
} as const;

export const REDIS_KEYS = {
  venue: (id: string) => `venue:${id}`,
  featured: () => 'venues:featured',
  popular: () => 'venues:popular',
  categories: () => 'venues:categories',
  amenities: () => 'venues:amenities',
  search: (hash: string) => `venues:search:${hash}`,
  ownerVenues: (ownerId: string) => `venues:owner:${ownerId}`,
} as const;

export const CACHE_TTL = {
  VENUE: 300,       // 5 min
  FEATURED: 120,    // 2 min
  POPULAR: 120,
  CATEGORIES: 3600, // 1 hour
  AMENITIES: 3600,
  SEARCH: 60,       // 1 min
  OWNER_VENUES: 120,
} as const;

export const CLOUDINARY_VENUE_FOLDER = 'bookmyvenue/venue-images';
export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
export const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const DEFAULT_VENUE_CATEGORIES = [
  { name: 'Auditorium', icon: '🎭', description: 'Large spaces for performances and conferences' },
  { name: 'Birthday Hall', icon: '🎂', description: 'Decorated halls for birthday celebrations' },
  { name: 'Meeting Room', icon: '💼', description: 'Professional spaces for business meetings' },
  { name: 'Cafe', icon: '☕', description: 'Cozy cafes for casual meetups' },
  { name: 'Resort', icon: '🏖️', description: 'Premium resorts for destination events' },
  { name: 'Hotel', icon: '🏨', description: 'Hotel banquet and conference rooms' },
  { name: 'Convention Center', icon: '🏛️', description: 'Large convention and exhibition spaces' },
  { name: 'Outdoor Venue', icon: '🌿', description: 'Open-air spaces for events' },
];

export const DEFAULT_AMENITIES = [
  { name: 'Parking', icon: '🅿️' },
  { name: 'WiFi', icon: '📶' },
  { name: 'AC', icon: '❄️' },
  { name: 'Projector', icon: '📽️' },
  { name: 'Sound System', icon: '🔊' },
  { name: 'Generator', icon: '⚡' },
  { name: 'Food Service', icon: '🍽️' },
  { name: 'Stage', icon: '🎤' },
];
