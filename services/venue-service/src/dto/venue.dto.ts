export interface CreateVenueDTO {
  venueName: string;
  description: string;
  category: string;
  pricePerHour: number;
  maxCapacity: number;
  address: string;
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  amenities?: string[];
}

export interface UpdateVenueDTO {
  venueName?: string;
  description?: string;
  category?: string;
  pricePerHour?: number;
  maxCapacity?: number;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  amenities?: string[];
}
