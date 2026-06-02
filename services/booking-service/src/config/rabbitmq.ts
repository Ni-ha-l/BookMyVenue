import amqplib, { Connection, Channel } from 'amqplib';
import { env } from './env';
import { logger } from '../utils/logger';

let connection: Connection | null = null;
let channel: Channel | null = null;

const RECONNECT_DELAY_MS = 5000;

export const EXCHANGES = {
  BOOKING: 'booking.events',
} as const;

export const QUEUES = {
  BOOKING_CREATED: 'booking.created',
  BOOKING_CONFIRMED: 'booking.confirmed',
  BOOKING_REJECTED: 'booking.rejected',
  BOOKING_CANCELLED: 'booking.cancelled',
  BOOKING_COMPLETED: 'booking.completed',
} as const;

export const connectRabbitMQ = async (): Promise<void> => {
  try {
    connection = await amqplib.connect(env.rabbitmq.url);
    channel = await connection.createChannel();

    await channel.assertExchange(EXCHANGES.BOOKING, 'topic', { durable: true });

    await Promise.all(
      Object.values(QUEUES).map(async (queue) => {
        await channel!.assertQueue(queue, { durable: true });
        await channel!.bindQueue(queue, EXCHANGES.BOOKING, queue);
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
