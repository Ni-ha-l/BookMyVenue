import mongoose from 'mongoose';
import { env } from './env';
import { logger } from '../utils/logger';

mongoose.connection.on('connected', () => logger.info('MongoDB connected'));
mongoose.connection.on('error', (err) => logger.error('MongoDB error', { error: err.message }));
mongoose.connection.on('disconnected', () => logger.warn('MongoDB disconnected'));

export const connectDatabase = async (): Promise<void> => {
  await mongoose.connect(env.mongoUri, { serverSelectionTimeoutMS: 5000 });
};

export const disconnectDatabase = async (): Promise<void> => {
  await mongoose.disconnect();
};
