import swaggerJsdoc from 'swagger-jsdoc';
import { env } from './env';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BookMyVenue Notification Service API',
      version: '1.0.0',
      description: 'Notification Management Microservice for BookMyVenue',
    },
    servers: [{ url: `http://localhost:${env.port}`, description: 'Local server' }],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
      schemas: {
        Notification: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            userId: { type: 'string' },
            type: { type: 'string', enum: ['EMAIL', 'PUSH', 'IN_APP'] },
            title: { type: 'string' },
            message: { type: 'string' },
            status: { type: 'string', enum: ['PENDING', 'SENT', 'FAILED', 'READ'] },
            data: { type: 'object' },
            readAt: { type: 'string', format: 'date-time' },
            sentAt: { type: 'string', format: 'date-time' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        RegisterDeviceToken: {
          type: 'object',
          required: ['fcmToken', 'deviceType'],
          properties: {
            fcmToken: { type: 'string' },
            deviceType: { type: 'string', enum: ['ANDROID', 'IOS', 'WEB'] },
          },
        },
        UpdatePreferences: {
          type: 'object',
          properties: {
            emailEnabled: { type: 'boolean' },
            pushEnabled: { type: 'boolean' },
            inAppEnabled: { type: 'boolean' },
            bookingNotifications: { type: 'boolean' },
            marketingNotifications: { type: 'boolean' },
          },
        },
        NotificationPreferences: {
          type: 'object',
          properties: {
            emailEnabled: { type: 'boolean' },
            pushEnabled: { type: 'boolean' },
            inAppEnabled: { type: 'boolean' },
            bookingNotifications: { type: 'boolean' },
            marketingNotifications: { type: 'boolean' },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
