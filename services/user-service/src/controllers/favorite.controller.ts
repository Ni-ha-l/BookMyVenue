import { Request, Response, NextFunction } from 'express';
import { favoriteService } from '../services/favorite.service';
import { sendSuccess } from '../utils/response';
import { HTTP_STATUS, SUCCESS_MESSAGES } from '../constants';

export class FavoriteController {
  async getFavorites(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const favorites = await favoriteService.getFavorites(req.user!.userId);
      sendSuccess(res, HTTP_STATUS.OK, SUCCESS_MESSAGES.FAVORITES_FETCHED, { favorites });
    } catch (err) {
      next(err);
    }
  }

  async addFavorite(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const favorite = await favoriteService.addFavorite(req.user!.userId, req.params.venueId);
      sendSuccess(res, HTTP_STATUS.CREATED, SUCCESS_MESSAGES.FAVORITE_ADDED, { favorite });
    } catch (err) {
      next(err);
    }
  }

  async removeFavorite(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await favoriteService.removeFavorite(req.user!.userId, req.params.venueId);
      sendSuccess(res, HTTP_STATUS.OK, SUCCESS_MESSAGES.FAVORITE_REMOVED);
    } catch (err) {
      next(err);
    }
  }
}

export const favoriteController = new FavoriteController();
