export enum Role {
  USER = 'USER',
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
}

export enum VenueStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface ITokenPayload {
  userId: string;
  role: Role;
}

export interface IGeoLocation {
  type: 'Point';
  coordinates: [number, number]; // [longitude, latitude]
}

export interface IVenue {
  ownerId: string;
  venueName: string;
  description: string;
  category: string;
  pricePerHour: number;
  maxCapacity: number;
  address: string;
  city: string;
  state: string;
  country: string;
  location: IGeoLocation;
  amenities: string[];
  images: string[];
  status: VenueStatus;
  isFeatured: boolean;
  isDeleted: boolean;
  averageRating: number;
  totalReviews: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IVenueImage {
  venueId: string;
  imageUrl: string;
  cloudinaryPublicId: string;
  isPrimary: boolean;
}

export interface IVenueCategory {
  name: string;
  icon: string;
  description: string;
}

export interface IAmenity {
  name: string;
  icon: string;
}

export interface IVenueSearchQuery {
  q?: string;
  category?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  minCapacity?: number;
  amenities?: string[];
  minRating?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface INearbyQuery {
  latitude: number;
  longitude: number;
  radius: number; // km
  page?: number;
  limit?: number;
}

export interface IPaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
