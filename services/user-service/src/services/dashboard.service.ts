import { UserDashboardRepository } from '../repositories/userDashboard.repository';
import { FavoriteVenueRepository } from '../repositories/favoriteVenue.repository';
import { logger } from '../utils/logger';
import { cacheGet, cacheSet } from '../utils/cache';
import { REDIS_KEYS, CACHE_TTL } from '../constants';
import { IUserDashboard } from '../interfaces';

export class DashboardService {
  constructor(
    private readonly dashboardRepo: UserDashboardRepository,
    private readonly favoriteRepo: FavoriteVenueRepository
  ) {}

  async getDashboard(userId: string): Promise<IUserDashboard> {
    const cached = await cacheGet<IUserDashboard>(REDIS_KEYS.dashboard(userId));
    if (cached) return cached;

    // Hydrate favoriteVenueCount from live count to ensure accuracy
    const [dashboard, favoriteVenueCount] = await Promise.all([
      this.dashboardRepo.findByUserId(userId),
      this.favoriteRepo.countByUserId(userId),
    ]);

    const data: IUserDashboard = {
      userId,
      totalBookings: dashboard?.totalBookings ?? 0,
      upcomingBookings: dashboard?.upcomingBookings ?? 0,
      completedBookings: dashboard?.completedBookings ?? 0,
      favoriteVenueCount,
    };

    // Sync favoriteVenueCount back to DB
    await this.dashboardRepo.upsert(userId, { favoriteVenueCount });

    await cacheSet(REDIS_KEYS.dashboard(userId), data, CACHE_TTL.DASHBOARD);
    logger.info('Dashboard fetched', { userId });
    return data;
  }
}

export const dashboardService = new DashboardService(
  new UserDashboardRepository(),
  new FavoriteVenueRepository()
);
