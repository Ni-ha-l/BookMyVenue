import amqplib, { Connection, Channel } from 'amqplib';
import { env } from './env';
import { logger } from '../utils/logger';

let connection: Connection | null = null;
let channel: Channel | null = null;

const RECONNECT_DELAY_MS = 5000;

export const EXCHANGES = {
  BOOKING: 'booking.events',
  USER: 'user.events',
  VENUE: 'venue.events',
  PAYMENT: 'payment.events',
} as const;

export const ANALYTICS_QUEUES = {
  USER_REGISTERED: 'analytics.user.registered',
  OWNER_REGISTERED: 'analytics.owner.registered',
  VENUE_CREATED: 'analytics.venue.created',
  VENUE_APPROVED: 'analytics.venue.approved',
  BOOKING_CREATED: 'analytics.booking.created',
  BOOKING_CONFIRMED: 'analytics.booking.confirmed',
  BOOKING_CANCELLED: 'analytics.booking.cancelled',
  BOOKING_COMPLETED: 'analytics.booking.completed',
  PAYMENT_SUCCESS: 'analytics.payment.success',
  PAYMENT_FAILED: 'analytics.payment.failed',
} as const;

export const ROUTING_KEYS = {
  USER_REGISTERED: 'user.registered',
  OWNER_REGISTERED: 'owner.registered',
  VENUE_CREATED: 'venue.created',
  VENUE_APPROVED: 'venue.approved',
  BOOKING_CREATED: 'booking.created',
  BOOKING_CONFIRMED: 'booking.confirmed',
  BOOKING_CANCELLED: 'booking.cancelled',
  BOOKING_COMPLETED: 'booking.completed',
  PAYMENT_SUCCESS: 'payment.success',
  PAYMENT_FAILED: 'payment.failed',
} as const;

export const connectRabbitMQ = async (): Promise<void> => {
  try {
    connection = await amqplib.connect(env.rabbitmq.url);
    channel = await connection.createChannel();

    await Promise.all([
      channel.assertExchange(EXCHANGES.BOOKING, 'topic', { durable: true }),
      channel.assertExchange(EXCHANGES.USER, 'topic', { durable: true }),
      channel.assertExchange(EXCHANGES.VENUE, 'topic', { durable: true }),
      channel.assertExchange(EXCHANGES.PAYMENT, 'topic', { durable: true }),
    ]);

    const bindings: Array<{ queue: string; exchange: string; routingKey: string }> = [
      { queue: ANALYTICS_QUEUES.USER_REGISTERED, exchange: EXCHANGES.USER, routingKey: ROUTING_KEYS.USER_REGISTERED },
      { queue: ANALYTICS_QUEUES.OWNER_REGISTERED, exchange: EXCHANGES.USER, routingKey: ROUTING_KEYS.OWNER_REGISTERED },
      { queue: ANALYTICS_QUEUES.VENUE_CREATED, exchange: EXCHANGES.VENUE, routingKey: ROUTING_KEYS.VENUE_CREATED },
      { queue: ANALYTICS_QUEUES.VENUE_APPROVED, exchange: EXCHANGES.VENUE, routingKey: ROUTING_KEYS.VENUE_APPROVED },
      { queue: ANALYTICS_QUEUES.BOOKING_CREATED, exchange: EXCHANGES.BOOKING, routingKey: ROUTING_KEYS.BOOKING_CREATED },
      { queue: ANALYTICS_QUEUES.BOOKING_CONFIRMED, exchange: EXCHANGES.BOOKING, routingKey: ROUTING_KEYS.BOOKING_CONFIRMED },
      { queue: ANALYTICS_QUEUES.BOOKING_CANCELLED, exchange: EXCHANGES.BOOKING, routingKey: ROUTING_KEYS.BOOKING_CANCELLED },
      { queue: ANALYTICS_QUEUES.BOOKING_COMPLETED, exchange: EXCHANGES.BOOKING, routingKey: ROUTING_KEYS.BOOKING_COMPLETED },
      { queue: ANALYTICS_QUEUES.PAYMENT_SUCCESS, exchange: EXCHANGES.PAYMENT, routingKey: ROUTING_KEYS.PAYMENT_SUCCESS },
      { queue: ANALYTICS_QUEUES.PAYMENT_FAILED, exchange: EXCHANGES.PAYMENT, routingKey: ROUTING_KEYS.PAYMENT_FAILED },
    ];

    await Promise.all(
      bindings.map(async ({ queue, exchange, routingKey }) => {
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

    logger.info('RabbitMQ connected');
  } catch (err) {
    logger.error('RabbitMQ connection failed', { error: (err as Error).message });
    scheduleReconnect();
  }
};

const scheduleReconnect = (): void => {
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
