import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';
import { sendSuccess } from '../utils/response';
import { HTTP_STATUS, SUCCESS_MESSAGES } from '../constants';

export class AuthController {
  async registerUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await authService.registerUser(req.body);
      sendSuccess(res, HTTP_STATUS.CREATED, SUCCESS_MESSAGES.REGISTERED, { user });
    } catch (err) {
      next(err);
    }
  }

  async registerOwner(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await authService.registerOwner(req.body);
      sendSuccess(res, HTTP_STATUS.CREATED, SUCCESS_MESSAGES.OWNER_REGISTERED, { user });
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await authService.login(req.body);
      sendSuccess(res, HTTP_STATUS.OK, SUCCESS_MESSAGES.LOGIN, {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        user: result.user,
      });
    } catch (err) {
      next(err);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { refreshToken } = req.body;
      const result = await authService.refreshToken(refreshToken);
      sendSuccess(res, HTTP_STATUS.OK, SUCCESS_MESSAGES.TOKEN_REFRESHED, result);
    } catch (err) {
      next(err);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await authService.logout(req.user!.userId);
      sendSuccess(res, HTTP_STATUS.OK, SUCCESS_MESSAGES.LOGOUT);
    } catch (err) {
      next(err);
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await authService.forgotPassword(req.body.email);
      sendSuccess(res, HTTP_STATUS.OK, SUCCESS_MESSAGES.OTP_SENT);
    } catch (err) {
      next(err);
    }
  }

  async verifyOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await authService.verifyOtp(req.body);
      sendSuccess(res, HTTP_STATUS.OK, SUCCESS_MESSAGES.OTP_VERIFIED);
    } catch (err) {
      next(err);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await authService.resetPassword(req.body);
      sendSuccess(res, HTTP_STATUS.OK, SUCCESS_MESSAGES.PASSWORD_RESET);
    } catch (err) {
      next(err);
    }
  }

  async getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await authService.getMe(req.user!.userId);
      sendSuccess(res, HTTP_STATUS.OK, 'User fetched', { user });
    } catch (err) {
      next(err);
    }
  }
}

export const authController = new AuthController();
