import { env } from './config/env';
import { logger } from './utils/logger';
import { connectDatabase, disconnectDatabase } from './config/database';
import redis from './config/redis';
import app from './app';

const start = async (): Promise<void> => {
  try {
    await connectDatabase();
    await redis.connect();

    const server = app.listen(env.port, () => {
      logger.info('Auth service running', { port: env.port, env: env.nodeEnv });
    });

    const shutdown = async (signal: string) => {
      logger.info(`Received ${signal}, shutting down gracefully`);
      server.close(async () => {
        await disconnectDatabase();
        await redis.quit();
        logger.info('Server shut down');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (err) {
    logger.error('Failed to start server', { error: (err as Error).message });
    process.exit(1);
  }
};

start();
