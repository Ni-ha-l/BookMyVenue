import { UserRepository } from '../repositories/user.repository';
import { tokenService } from './token.service';
import { emailService } from './email.service';
import { hashPassword, comparePassword, hashOtp, compareOtp } from '../utils/hash';
import { generateOtp } from '../utils/otp';
import { verifyRefreshToken } from '../utils/jwt';
import { AppError } from '../utils/AppError';
import { logger } from '../utils/logger';
import { env } from '../config/env';
import { HTTP_STATUS, ERROR_MESSAGES } from '../constants';
import {
  Role,
  Status,
  IRegisterUserDTO,
  IRegisterOwnerDTO,
  ILoginDTO,
  IResetPasswordDTO,
  IVerifyOtpDTO,
  ISafeUser,
  IAuthTokens,
} from '../interfaces';
import { IUserDocument } from '../models/user.model';

export class AuthService {
  constructor(private readonly userRepo: UserRepository) {}

  async registerUser(dto: IRegisterUserDTO): Promise<ISafeUser> {
    const existing = await this.userRepo.findByEmail(dto.email);
    if (existing) throw new AppError(ERROR_MESSAGES.EMAIL_TAKEN, HTTP_STATUS.CONFLICT);

    const hashed = await hashPassword(dto.password);
    const user = await this.userRepo.createUser({ email: dto.email, password: hashed });

    logger.info('User registered', { userId: user._id.toString(), email: user.email });
    return this.toSafeUser(user);
  }

  async registerOwner(dto: IRegisterOwnerDTO): Promise<ISafeUser> {
    const existing = await this.userRepo.findByEmail(dto.email);
    if (existing) throw new AppError(ERROR_MESSAGES.EMAIL_TAKEN, HTTP_STATUS.CONFLICT);

    const hashedPassword = await hashPassword(dto.password);
    const user = await this.userRepo.createOwner({ ...dto, hashedPassword });

    logger.info('Owner registered', { userId: user._id.toString(), email: user.email });
    return this.toSafeUser(user);
  }

  async login(dto: ILoginDTO): Promise<{ user: ISafeUser } & IAuthTokens> {
    const user = await this.userRepo.findByEmail(dto.email);

    if (!user || !(await comparePassword(dto.password, user.password))) {
      logger.warn('Failed login attempt', { email: dto.email });
      throw new AppError(ERROR_MESSAGES.INVALID_CREDENTIALS, HTTP_STATUS.UNAUTHORIZED);
    }

    if (user.status === Status.SUSPENDED) {
      throw new AppError(ERROR_MESSAGES.ACCOUNT_SUSPENDED, HTTP_STATUS.FORBIDDEN);
    }

    const userId = user._id.toString();
    const tokens = await tokenService.generateTokens({ userId, role: user.role as Role });
    await this.userRepo.updateRefreshToken(userId, tokens.refreshToken);

    logger.info('User logged in', { userId, role: user.role });
    return { user: this.toSafeUser(user), ...tokens };
  }

  async refreshToken(token: string): Promise<{ accessToken: string }> {
    let payload;
    try {
      payload = verifyRefreshToken(token);
    } catch {
      throw new AppError(ERROR_MESSAGES.INVALID_TOKEN, HTTP_STATUS.UNAUTHORIZED);
    }

    const stored = await tokenService.getStoredRefreshToken(payload.userId);
    if (!stored || stored !== token) {
      throw new AppError(ERROR_MESSAGES.INVALID_TOKEN, HTTP_STATUS.UNAUTHORIZED);
    }

    const { accessToken } = await tokenService.generateTokens({
      userId: payload.userId,
      role: payload.role,
    });
    return { accessToken };
  }

  async logout(userId: string): Promise<void> {
    await tokenService.revokeRefreshToken(userId);
    await this.userRepo.updateRefreshToken(userId, null);
    logger.info('User logged out', { userId });
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) return; // Silent — prevents email enumeration

    const otp = generateOtp();
    const otpHash = await hashOtp(otp);
    const expiresAt = new Date(Date.now() + env.otpExpiryMinutes * 60 * 1000);
    const userId = user._id.toString();

    await this.userRepo.upsertOtp(userId, otpHash, expiresAt);
    await emailService.sendOtp(email, otp);

    logger.info('OTP sent for password reset', { userId });
  }

  async verifyOtp(dto: IVerifyOtpDTO): Promise<void> {
    const user = await this.userRepo.findByEmail(dto.email);
    if (!user) throw new AppError(ERROR_MESSAGES.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);

    const record = await this.userRepo.findOtp(user._id.toString());
    if (!record || record.expiresAt < new Date()) {
      throw new AppError(ERROR_MESSAGES.INVALID_OTP, HTTP_STATUS.BAD_REQUEST);
    }

    const valid = await compareOtp(dto.otp, record.otpHash);
    if (!valid) throw new AppError(ERROR_MESSAGES.INVALID_OTP, HTTP_STATUS.BAD_REQUEST);
  }

  async resetPassword(dto: IResetPasswordDTO): Promise<void> {
    const user = await this.userRepo.findByEmail(dto.email);
    if (!user) throw new AppError(ERROR_MESSAGES.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);

    const userId = user._id.toString();
    const record = await this.userRepo.findOtp(userId);
    if (!record || record.expiresAt < new Date()) {
      throw new AppError(ERROR_MESSAGES.INVALID_OTP, HTTP_STATUS.BAD_REQUEST);
    }

    const valid = await compareOtp(dto.otp, record.otpHash);
    if (!valid) throw new AppError(ERROR_MESSAGES.INVALID_OTP, HTTP_STATUS.BAD_REQUEST);

    const hashed = await hashPassword(dto.newPassword);
    await this.userRepo.updatePassword(userId, hashed);
    await this.userRepo.deleteOtp(userId);
    await tokenService.revokeRefreshToken(userId);

    logger.info('Password reset successful', { userId });
  }

  async getMe(userId: string): Promise<ISafeUser> {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new AppError(ERROR_MESSAGES.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    return this.toSafeUser(user);
  }

  private toSafeUser(user: IUserDocument): ISafeUser {
    return {
      id: user._id.toString(),
      email: user.email,
      role: user.role as Role,
      status: user.status as Status,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
    };
  }
}

export const authService = new AuthService(new UserRepository());
