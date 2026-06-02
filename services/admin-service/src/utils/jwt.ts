import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { ITokenPayload, Role } from '../interfaces';

export const verifyAccessToken = (token: string): ITokenPayload => {
  const decoded = jwt.verify(token, env.jwt.accessSecret) as ITokenPayload;
  return { userId: decoded.userId, role: decoded.role as Role };
};
