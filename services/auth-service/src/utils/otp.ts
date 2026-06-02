import crypto from 'crypto';

export const generateOtp = (): string =>
  String(crypto.randomInt(100000, 999999));
