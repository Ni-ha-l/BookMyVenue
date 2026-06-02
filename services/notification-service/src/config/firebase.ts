import admin from 'firebase-admin';
import { env } from './env';
import { logger } from '../utils/logger';

let isInitialised = false;

export const initFirebase = (): void => {
  if (isInitialised || !env.fcm.projectId || !env.fcm.clientEmail || !env.fcm.privateKey) {
    if (!env.fcm.projectId) logger.warn('FCM credentials not configured — push notifications disabled');
    return;
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: env.fcm.projectId,
      privateKey: env.fcm.privateKey,
      clientEmail: env.fcm.clientEmail,
    }),
  });

  isInitialised = true;
  logger.info('Firebase Admin initialised', { project: env.fcm.projectId });
};

export const getMessaging = (): admin.messaging.Messaging => {
  if (!isInitialised) throw new Error('Firebase not initialised');
  return admin.messaging();
};

export { isInitialised as isFcmEnabled };
