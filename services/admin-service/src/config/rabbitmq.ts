import amqplib, { Connection, Channel } from 'amqplib';
import { env } from './env';
import { logger } from '../utils/logger';

let connection: Connection | null = null;
let channel: Channel | null = null;

const RECONNECT_DELAY_MS = 5000;

export const EXCHANGES = {
  ADMIN: 'admin.events',
  BOOKING: 'booking.events',
  PAYMENT: 'payment.events',
} as const;

export const PUBLISH_ROUTING_KEYS = {
  OWNER_APPROVED: 'owner.approved',
  OWNER_REJECTED: 'owner.rejected',
  VENUE_APPROVED: 'venue.approved',
  VENUE_REJECTED: 'venue.rejected',
  USER_SUSPENDED: 'user.suspended',
  USER_ACTIVATED: 'user.activated',
  BOOKING_CANCELLED_BY_ADMIN: 'booking.cancelled.admin',
} as const;

export const CONSUME_QUEUES = {
  BOOKING_CREATED: 'admin.booking.created',
  BOOKING_COMPLETED: 'admin.booking.completed',
  PAYMENT_SUCCESS: 'admin.payment.success',
} as const;

const QUEUE_BINDINGS = [
  { queue: CONSUME_QUEUES.BOOKING_CREATED,   exchange: EXCHANGES.BOOKING, routingKey: 'booking.created' },
  { queue: CONSUME_QUEUES.BOOKING_COMPLETED, exchange: EXCHANGES.BOOKING, routingKey: 'booking.completed' },
  { queue: CONSUME_QUEUES.PAYMENT_SUCCESS,   exchange: EXCHANGES.PAYMENT, routingKey: 'payment.success' },
];

export const connectRabbitMQ = async (): Promise<void> => {
  try {
    connection = await amqplib.connect(env.rabbitmq.url);
    channel = await connection.createChannel();
    await channel.prefetch(10);

    const uniqueExchanges = [...new Set([EXCHANGES.ADMIN, EXCHANGES.BOOKING, EXCHANGES.PAYMENT])];
    await Promise.all(
      uniqueExchanges.map((ex) => channel!.assertExchange(ex, 'topic', { durable: true }))
    );

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

    logger.info('RabbitMQ connected');
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
