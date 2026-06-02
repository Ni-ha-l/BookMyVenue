import swaggerJsdoc from 'swagger-jsdoc';
import { env } from './env';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BookMyVenue Booking Service API',
      version: '1.0.0',
      description: 'Booking Management Microservice for BookMyVenue',
    },
    servers: [{ url: `http://localhost:${env.port}`, description: 'Local server' }],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
      schemas: {
        CreateBookingDTO: {
          type: 'object',
          required: ['venueId', 'eventName', 'eventType', 'bookingDate', 'startTime', 'endTime', 'guestCount'],
          properties: {
            venueId: { type: 'string' },
            eventName: { type: 'string' },
            eventType: { type: 'string' },
            bookingDate: { type: 'string', format: 'date', example: '2026-06-15' },
            startTime: { type: 'string', example: '10:00' },
            endTime: { type: 'string', example: '18:00' },
            guestCount: { type: 'integer', minimum: 1 },
            specialRequest: { type: 'string' },
          },
        },
        RejectBookingDTO: {
          type: 'object',
          required: ['reason'],
          properties: {
            reason: { type: 'string' },
          },
        },
        Booking: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            bookingNumber: { type: 'string' },
            userId: { type: 'string' },
            venueId: { type: 'string' },
            ownerId: { type: 'string' },
            eventName: { type: 'string' },
            eventType: { type: 'string' },
            bookingDate: { type: 'string', format: 'date' },
            startTime: { type: 'string' },
            endTime: { type: 'string' },
            guestCount: { type: 'integer' },
            specialRequest: { type: 'string' },
            totalAmount: { type: 'number' },
            status: { type: 'string', enum: ['PENDING', 'CONFIRMED', 'REJECTED', 'CANCELLED', 'COMPLETED'] },
            rejectionReason: { type: 'string' },
            cancelledBy: { type: 'string', enum: ['USER', 'OWNER', 'ADMIN'] },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        UserDashboard: {
          type: 'object',
          properties: {
            totalBookings: { type: 'integer' },
            upcomingBookings: { type: 'integer' },
            completedBookings: { type: 'integer' },
            cancelledBookings: { type: 'integer' },
          },
        },
        OwnerDashboard: {
          type: 'object',
          properties: {
            totalBookings: { type: 'integer' },
            pendingBookings: { type: 'integer' },
            confirmedBookings: { type: 'integer' },
            revenue: { type: 'number' },
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
