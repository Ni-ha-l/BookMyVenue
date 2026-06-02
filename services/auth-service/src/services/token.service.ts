import redis from '../config/redis';
import { REDIS_KEYS } from '../constants';
import { env } from '../config/env';
import { ITokenPayload, IAuthTokens } from '../interfaces';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';

const REFRESH_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 days

export class TokenService {
  async generateTokens(payload: ITokenPayload): Promise<IAuthTokens> {
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    await redis.set(REDIS_KEYS.refreshToken(payload.userId), refreshToken, 'EX', REFRESH_TTL_SECONDS);
    return { accessToken, refreshToken };
  }

  async getStoredRefreshToken(userId: string): Promise<string | null> {
    return redis.get(REDIS_KEYS.refreshToken(userId));
  }

  async revokeRefreshToken(userId: string): Promise<void> {
    await redis.del(REDIS_KEYS.refreshToken(userId));
  }
}

export const tokenService = new TokenService();
