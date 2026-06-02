import { UserDashboardModel, IUserDashboardDocument } from '../models/userDashboard.model';

export class UserDashboardRepository {
  async findByUserId(userId: string): Promise<IUserDashboardDocument | null> {
    return UserDashboardModel.findOne({ userId }).exec();
  }

  async upsert(
    userId: string,
    data: Partial<Omit<IUserDashboardDocument, '_id' | 'userId'>>
  ): Promise<IUserDashboardDocument> {
    return UserDashboardModel.findOneAndUpdate(
      { userId },
      { $set: data },
      { new: true, upsert: true }
    ).exec() as Promise<IUserDashboardDocument>;
  }

  async incrementField(
    userId: string,
    field: 'totalBookings' | 'upcomingBookings' | 'completedBookings' | 'favoriteVenueCount',
    amount = 1
  ): Promise<void> {
    await UserDashboardModel.findOneAndUpdate(
      { userId },
      { $inc: { [field]: amount } },
      { upsert: true }
    ).exec();
  }
}
