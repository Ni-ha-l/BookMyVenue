export enum Role {
  USER = 'USER',
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
  PREFER_NOT_TO_SAY = 'PREFER_NOT_TO_SAY',
}

export interface ITokenPayload {
  userId: string;
  role: Role;
}

export interface IUserProfile {
  userId: string;
  firstName: string;
  lastName: string;
  phone?: string;
  profileImage?: string;
  cloudinaryPublicId?: string;
  gender?: Gender;
  dateOfBirth?: Date;
  city?: string;
  state?: string;
  country?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFavoriteVenue {
  userId: string;
  venueId: string;
  createdAt: Date;
}

export interface IUserPreference {
  userId: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDashboard {
  userId: string;
  totalBookings: number;
  upcomingBookings: number;
  completedBookings: number;
  favoriteVenueCount: number;
}
