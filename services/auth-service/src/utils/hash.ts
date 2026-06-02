import bcrypt from 'bcryptjs';
import { env } from '../config/env';

export const hashPassword = (password: string): Promise<string> =>
  bcrypt.hash(password, env.bcryptRounds);

export const comparePassword = (plain: string, hashed: string): Promise<boolean> =>
  bcrypt.compare(plain, hashed);

export const hashOtp = (otp: string): Promise<string> => bcrypt.hash(otp, 10);

export const compareOtp = (plain: string, hashed: string): Promise<boolean> =>
  bcrypt.compare(plain, hashed);
