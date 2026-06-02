import { Gender } from '../interfaces';

export interface CreateProfileDTO {
  firstName: string;
  lastName: string;
  phone?: string;
  city?: string;
  state?: string;
  country?: string;
  bio?: string;
}

export interface UpdateProfileDTO {
  firstName?: string;
  lastName?: string;
  phone?: string;
  gender?: Gender;
  dateOfBirth?: Date;
  city?: string;
  state?: string;
  country?: string;
  bio?: string;
}

export interface UpdatePreferencesDTO {
  emailNotifications?: boolean;
  pushNotifications?: boolean;
  marketingEmails?: boolean;
}
