export interface CreateBookingDTO {
  venueId: string;
  eventName: string;
  eventType: string;
  bookingDate: string; // ISO date string YYYY-MM-DD
  startTime: string;   // HH:mm
  endTime: string;     // HH:mm
  guestCount: number;
  specialRequest?: string;
}

export interface RejectBookingDTO {
  reason: string;
}

export interface BookingQueryDTO {
  page?: number;
  limit?: number;
  status?: string;
  sortOrder?: 'asc' | 'desc';
}
