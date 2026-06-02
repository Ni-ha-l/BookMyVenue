import swaggerJsdoc from 'swagger-jsdoc';
import { env } from './env';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BookMyVenue Venue Service API',
      version: '1.0.0',
      description: 'Venue Management Microservice for BookMyVenue',
    },
    servers: [{ url: `http://localhost:${env.port}`, description: 'Local server' }],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
      schemas: {
        CreateVenueDTO: {
          type: 'object',
          required: ['venueName', 'description', 'category', 'pricePerHour', 'maxCapacity', 'address', 'city', 'state', 'country', 'latitude', 'longitude'],
          properties: {
            venueName: { type: 'string' },
            description: { type: 'string' },
            category: { type: 'string' },
            pricePerHour: { type: 'number', minimum: 0 },
            maxCapacity: { type: 'integer', minimum: 1 },
            address: { type: 'string' },
            city: { type: 'string' },
            state: { type: 'string' },
            country: { type: 'string' },
            latitude: { type: 'number', minimum: -90, maximum: 90 },
            longitude: { type: 'number', minimum: -180, maximum: 180 },
            amenities: { type: 'array', items: { type: 'string' } },
          },
        },
        Venue: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            ownerId: { type: 'string' },
            venueName: { type: 'string' },
            description: { type: 'string' },
            category: { type: 'string' },
            pricePerHour: { type: 'number' },
            maxCapacity: { type: 'integer' },
            address: { type: 'string' },
            city: { type: 'string' },
            state: { type: 'string' },
            country: { type: 'string' },
            location: {
              type: 'object',
              properties: {
                type: { type: 'string', example: 'Point' },
                coordinates: { type: 'array', items: { type: 'number' } },
              },
            },
            amenities: { type: 'array', items: { type: 'string' } },
            images: { type: 'array', items: { type: 'string' } },
            status: { type: 'string', enum: ['PENDING', 'APPROVED', 'REJECTED'] },
            isFeatured: { type: 'boolean' },
            isDeleted: { type: 'boolean' },
            averageRating: { type: 'number' },
            totalReviews: { type: 'integer' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        VenueImage: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            venueId: { type: 'string' },
            imageUrl: { type: 'string' },
            cloudinaryPublicId: { type: 'string' },
            isPrimary: { type: 'boolean' },
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
