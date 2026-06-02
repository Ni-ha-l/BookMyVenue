import swaggerJsdoc from 'swagger-jsdoc';
import { env } from './env';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BookMyVenue User Service API',
      version: '1.0.0',
      description: 'User Profile Management Microservice for BookMyVenue',
    },
    servers: [{ url: `http://localhost:${env.port}`, description: 'Local server' }],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
      schemas: {
        UserProfile: {
          type: 'object',
          properties: {
            userId: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            phone: { type: 'string' },
            profileImage: { type: 'string' },
            gender: { type: 'string', enum: ['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY'] },
            dateOfBirth: { type: 'string', format: 'date' },
            city: { type: 'string' },
            state: { type: 'string' },
            country: { type: 'string' },
            bio: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        CreateProfileDTO: {
          type: 'object',
          required: ['firstName', 'lastName'],
          properties: {
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            phone: { type: 'string' },
            city: { type: 'string' },
            state: { type: 'string' },
            country: { type: 'string' },
            bio: { type: 'string' },
          },
        },
        UpdateProfileDTO: {
          type: 'object',
          properties: {
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            phone: { type: 'string' },
            gender: { type: 'string' },
            dateOfBirth: { type: 'string', format: 'date' },
            city: { type: 'string' },
            state: { type: 'string' },
            country: { type: 'string' },
            bio: { type: 'string' },
          },
        },
        UserPreference: {
          type: 'object',
          properties: {
            emailNotifications: { type: 'boolean' },
            pushNotifications: { type: 'boolean' },
            marketingEmails: { type: 'boolean' },
          },
        },
        Dashboard: {
          type: 'object',
          properties: {
            totalBookings: { type: 'integer' },
            upcomingBookings: { type: 'integer' },
            completedBookings: { type: 'integer' },
            favoriteVenueCount: { type: 'integer' },
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
