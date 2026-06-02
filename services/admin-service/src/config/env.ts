import dotenv from 'dotenv';
dotenv.config();

const required = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required env var: ${key}`);
  return value;
};

export const env = {
  port: parseInt(process.env.PORT || '3006', 10),
  nodeEnv: process.env.NODE_ENV || 'development',

  mongoUri: required('MONGODB_URI'),

  jwt: {
    accessSecret: required('JWT_ACCESS_SECRET'),
  },

  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
  },

  rabbitmq: {
    url: process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672',
  },

  services: {
    authUrl: process.env.AUTH_SERVICE_URL || 'http://localhost:3001',
    userUrl: process.env.USER_SERVICE_URL || 'http://localhost:3002',
    venueUrl: process.env.VENUE_SERVICE_URL || 'http://localhost:3003',
    bookingUrl: process.env.BOOKING_SERVICE_URL || 'http://localhost:3004',
    notificationUrl: process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:3005',
  },

  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
    max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  },
};
