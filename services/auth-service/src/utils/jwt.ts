import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { ITokenPayload, Role } from '../interfaces';

export const generateAccessToken = (payload: ITokenPayload): string =>
  jwt.sign(payload, env.jwt.accessSecret, { expiresIn: env.jwt.accessExpiry } as jwt.SignOptions);

export const generateRefreshToken = (payload: ITokenPayload): string =>
  jwt.sign(payload, env.jwt.refreshSecret, { expiresIn: env.jwt.refreshExpiry } as jwt.SignOptions);

export const verifyAccessToken = (token: string): ITokenPayload => {
  const decoded = jwt.verify(token, env.jwt.accessSecret) as ITokenPayload;
  return { userId: decoded.userId, role: decoded.role as Role };
};

export const verifyRefreshToken = (token: string): ITokenPayload => {
  const decoded = jwt.verify(token, env.jwt.refreshSecret) as ITokenPayload;
  return { userId: decoded.userId, role: decoded.role as Role };
};
