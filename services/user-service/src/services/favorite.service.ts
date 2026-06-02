import { FavoriteVenueRepository } from '../repositories/favoriteVenue.repository';
import { UserDashboardRepository } from '../repositories/userDashboard.repository';
import { AppError } from '../utils/AppError';
import { logger } from '../utils/logger';
import { HTTP_STATUS, ERROR_MESSAGES } from '../constants';
import { IFavoriteVenueDocument } from '../models/favoriteVenue.model';

export class FavoriteService {
  constructor(
    private readonly favoriteRepo: FavoriteVenueRepository,
    private readonly dashboardRepo: UserDashboardRepository
  ) {}

  async getFavorites(userId: string): Promise<IFavoriteVenueDocument[]> {
    return this.favoriteRepo.findAll(userId);
  }

  async addFavorite(userId: string, venueId: string): Promise<IFavoriteVenueDocument> {
    const existing = await this.favoriteRepo.findOne(userId, venueId);
    if (existing) throw new AppError(ERROR_MESSAGES.VENUE_ALREADY_FAVORITED, HTTP_STATUS.CONFLICT);

    const favorite = await this.favoriteRepo.add(userId, venueId);
    await this.dashboardRepo.incrementField(userId, 'favoriteVenueCount', 1);

    logger.info('Venue added to favorites', { userId, venueId });
    return favorite;
  }

  async removeFavorite(userId: string, venueId: string): Promise<void> {
    const existing = await this.favoriteRepo.findOne(userId, venueId);
    if (!existing) throw new AppError(ERROR_MESSAGES.VENUE_NOT_IN_FAVORITES, HTTP_STATUS.NOT_FOUND);

    await this.favoriteRepo.remove(userId, venueId);
    await this.dashboardRepo.incrementField(userId, 'favoriteVenueCount', -1);

    logger.info('Venue removed from favorites', { userId, venueId });
  }
}

export const favoriteService = new FavoriteService(
  new FavoriteVenueRepository(),
  new UserDashboardRepository()
);
