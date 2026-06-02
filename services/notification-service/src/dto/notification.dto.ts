import { DeviceType } from '../interfaces';

export interface RegisterDeviceTokenDTO {
  fcmToken: string;
  deviceType: DeviceType;
}

export interface UpdatePreferencesDTO {
  emailEnabled?: boolean;
  pushEnabled?: boolean;
  inAppEnabled?: boolean;
  bookingNotifications?: boolean;
  marketingNotifications?: boolean;
}

export interface NotificationQueryDTO {
  page?: number;
  limit?: number;
  type?: string;
  status?: string;
}

export interface SendEmailDTO {
  to: string;
  subject: string;
  templateName: string;
  templateData: Record<string, unknown>;
}

export interface SendPushDTO {
  userId: string;
  title: string;
  body: string;
  data?: Record<string, string>;
}

export interface CreateInAppDTO {
  userId: string;
  title: string;
  message: string;
  data?: Record<string, unknown>;
}
