import swaggerJsdoc from 'swagger-jsdoc';
import { env } from './env';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BookMyVenue Admin Service API',
      version: '1.0.0',
      description: 'Platform Administration Microservice for BookMyVenue — ADMIN role required for all routes',
    },
    servers: [{ url: `http://localhost:${env.port}`, description: 'Local server' }],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
      schemas: {
        Dashboard: {
          type: 'object',
          properties: {
            totalUsers: { type: 'integer' },
            totalOwners: { type: 'integer' },
            totalVenues: { type: 'integer' },
            totalBookings: { type: 'integer' },
            pendingVenues: { type: 'integer' },
            pendingOwners: { type: 'integer' },
            totalRevenue: { type: 'number' },
          },
        },
        SystemSettings: {
          type: 'object',
          properties: {
            bookingCommissionPercentage: { type: 'number', minimum: 0, maximum: 100 },
            ownerApprovalRequired: { type: 'boolean' },
            venueApprovalRequired: { type: 'boolean' },
            maintenanceMode: { type: 'boolean' },
          },
        },
        AuditLog: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            adminId: { type: 'string' },
            action: { type: 'string' },
            targetType: { type: 'string', enum: ['USER', 'OWNER', 'VENUE', 'BOOKING', 'SETTINGS'] },
            targetId: { type: 'string' },
            description: { type: 'string' },
            metadata: { type: 'object' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        RejectOwnerDTO: {
          type: 'object',
          required: ['reason'],
          properties: { reason: { type: 'string' } },
        },
        RejectVenueDTO: {
          type: 'object',
          required: ['reason'],
          properties: { reason: { type: 'string' } },
        },
        CancelBookingDTO: {
          type: 'object',
          required: ['reason'],
          properties: { reason: { type: 'string' } },
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
