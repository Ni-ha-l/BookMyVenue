import amqplib, { Connection, Channel } from 'amqplib';
import { env } from './env';
import { logger } from '../utils/logger';

let connection: Connection | null = null;
let channel: Channel | null = null;

const RECONNECT_DELAY_MS = 5000;

export const EXCHANGES = {
  BOOKING: 'booking.events',
  VENUE: 'venue.events',
  PAYMENT: 'payment.events',
  AUTH: 'auth.events',
} as const;

export const QUEUES = {
  // Booking events
  BOOKING_CREATED: 'notification.booking.created',
  BOOKING_CONFIRMED: 'notification.booking.confirmed',
  BOOKING_REJECTED: 'notification.booking.rejected',
  BOOKING_CANCELLED: 'notification.booking.cancelled',
  BOOKING_COMPLETED: 'notification.booking.completed',
  // Venue events
  VENUE_APPROVED: 'notification.venue.approved',
  VENUE_REJECTED: 'notification.venue.rejected',
  // Auth events
  OWNER_APPROVED: 'notification.owner.approved',
  // Payment events
  PAYMENT_SUCCESS: 'notification.payment.success',
  PAYMENT_FAILED: 'notification.payment.failed',
} as const;

export type QueueName = (typeof QUEUES)[keyof typeof QUEUES];

// Routing key → exchange mapping
const QUEUE_BINDINGS: { queue: QueueName; exchange: string; routingKey: string }[] = [
  { queue: QUEUES.BOOKING_CREATED,   exchange: EXCHANGES.BOOKING,  routingKey: 'booking.created' },
  { queue: QUEUES.BOOKING_CONFIRMED, exchange: EXCHANGES.BOOKING,  routingKey: 'booking.confirmed' },
  { queue: QUEUES.BOOKING_REJECTED,  exchange: EXCHANGES.BOOKING,  routingKey: 'booking.rejected' },
  { queue: QUEUES.BOOKING_CANCELLED, exchange: EXCHANGES.BOOKING,  routingKey: 'booking.cancelled' },
  { queue: QUEUES.BOOKING_COMPLETED, exchange: EXCHANGES.BOOKING,  routingKey: 'booking.completed' },
  { queue: QUEUES.VENUE_APPROVED,    exchange: EXCHANGES.VENUE,    routingKey: 'venue.approved' },
  { queue: QUEUES.VENUE_REJECTED,    exchange: EXCHANGES.VENUE,    routingKey: 'venue.rejected' },
  { queue: QUEUES.OWNER_APPROVED,    exchange: EXCHANGES.AUTH,     routingKey: 'owner.approved' },
  { queue: QUEUES.PAYMENT_SUCCESS,   exchange: EXCHANGES.PAYMENT,  routingKey: 'payment.success' },
  { queue: QUEUES.PAYMENT_FAILED,    exchange: EXCHANGES.PAYMENT,  routingKey: 'payment.failed' },
];

export const connectRabbitMQ = async (): Promise<void> => {
  try {
    connection = await amqplib.connect(env.rabbitmq.url);
    channel = await connection.createChannel();
    await channel.prefetch(10);

    // Assert all exchanges
    const uniqueExchanges = [...new Set(Object.values(EXCHANGES))];
    await Promise.all(
      uniqueExchanges.map((ex) => channel!.assertExchange(ex, 'topic', { durable: true }))
    );

    // Assert queues and bind
    await Promise.all(
      QUEUE_BINDINGS.map(async ({ queue, exchange, routingKey }) => {
        await channel!.assertQueue(queue, { durable: true });
        await channel!.bindQueue(queue, exchange, routingKey);
      })
    );

    connection.on('error', (err) => {
      logger.error('RabbitMQ connection error', { error: err.message });
      scheduleReconnect();
    });
    connection.on('close', () => {
      logger.warn('RabbitMQ connection closed, reconnecting...');
      scheduleReconnect();
    });

    logger.info('RabbitMQ connected and queues asserted');
  } catch (err) {
    logger.error('RabbitMQ connection failed', { error: (err as Error).message });
    scheduleReconnect();
  }
};

const scheduleReconnect = (): void => {
  connection = null;
  channel = null;
  setTimeout(() => connectRabbitMQ(), RECONNECT_DELAY_MS);
};

export const getChannel = (): Channel => {
  if (!channel) throw new Error('RabbitMQ channel not initialised');
  return channel;
};

export const disconnectRabbitMQ = async (): Promise<void> => {
  try {
    await channel?.close();
    await connection?.close();
    logger.info('RabbitMQ disconnected');
  } catch (err) {
    logger.error('RabbitMQ disconnect error', { error: (err as Error).message });
  }
};
