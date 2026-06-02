import mongoose from 'mongoose';
import { VenueModel, IVenueDocument } from '../models/venue.model';
import { CreateVenueDTO, UpdateVenueDTO } from '../dto/venue.dto';
import { VenueStatus, IVenueSearchQuery, INearbyQuery } from '../interfaces';

export class VenueRepository {
  async create(ownerId: string, dto: CreateVenueDTO): Promise<IVenueDocument> {
    return VenueModel.create({
      ...dto,
      ownerId,
      location: { type: 'Point', coordinates: [dto.longitude, dto.latitude] },
      status: VenueStatus.PENDING,
    });
  }

  async findById(id: string): Promise<IVenueDocument | null> {
    if (!mongoose.isValidObjectId(id)) return null;
    return VenueModel.findOne({ _id: id, isDeleted: false }).exec();
  }

  async findByIdAndOwner(id: string, ownerId: string): Promise<IVenueDocument | null> {
    if (!mongoose.isValidObjectId(id)) return null;
    return VenueModel.findOne({ _id: id, ownerId, isDeleted: false }).exec();
  }

  async update(id: string, dto: UpdateVenueDTO): Promise<IVenueDocument | null> {
    const update: Record<string, unknown> = { ...dto };
    if (dto.latitude !== undefined && dto.longitude !== undefined) {
      update['location'] = { type: 'Point', coordinates: [dto.longitude, dto.latitude] };
      delete update['latitude'];
      delete update['longitude'];
    }
    return VenueModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { $set: update },
      { new: true, runValidators: true }
    ).exec();
  }

  async softDelete(id: string): Promise<IVenueDocument | null> {
    return VenueModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { $set: { isDeleted: true } },
      { new: true }
    ).exec();
  }

  async updateStatus(id: string, status: VenueStatus): Promise<IVenueDocument | null> {
    return VenueModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { $set: { status } },
      { new: true }
    ).exec();
  }

  async toggleFeatured(id: string): Promise<IVenueDocument | null> {
    const venue = await VenueModel.findOne({ _id: id, isDeleted: false }).exec();
    if (!venue) return null;
    return VenueModel.findOneAndUpdate(
      { _id: id },
      { $set: { isFeatured: !venue.isFeatured } },
      { new: true }
    ).exec();
  }

  async addImage(id: string, imageUrl: string): Promise<IVenueDocument | null> {
    return VenueModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { $push: { images: imageUrl } },
      { new: true }
    ).exec();
  }

  async removeImage(id: string, imageUrl: string): Promise<IVenueDocument | null> {
    return VenueModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { $pull: { images: imageUrl } },
      { new: true }
    ).exec();
  }

  async findByOwner(ownerId: string, page: number, limit: number) {
    const filter = { ownerId, isDeleted: false };
    const [data, total] = await Promise.all([
      VenueModel.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).exec(),
      VenueModel.countDocuments(filter).exec(),
    ]);
    return { data, total };
  }

  async search(query: IVenueSearchQuery) {
    const {
      q, category, city, minPrice, maxPrice,
      minCapacity, amenities, minRating,
      page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc',
    } = query;

    const filter: Record<string, unknown> = {
      status: VenueStatus.APPROVED,
      isDeleted: false,
    };

    if (q) filter['$text'] = { $search: q };
    if (category) filter['category'] = { $regex: new RegExp(category, 'i') };
    if (city) filter['city'] = { $regex: new RegExp(city, 'i') };
    if (minPrice !== undefined || maxPrice !== undefined) {
      filter['pricePerHour'] = {
        ...(minPrice !== undefined && { $gte: minPrice }),
        ...(maxPrice !== undefined && { $lte: maxPrice }),
      };
    }
    if (minCapacity !== undefined) filter['maxCapacity'] = { $gte: minCapacity };
    if (amenities?.length) filter['amenities'] = { $all: amenities };
    if (minRating !== undefined) filter['averageRating'] = { $gte: minRating };

    const sortDir = sortOrder === 'asc' ? 1 : -1;
    const sort: Record<string, number> = { [sortBy]: sortDir };
    if (q) sort['score'] = { $meta: 'textScore' } as unknown as number;

    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      VenueModel.find(filter, q ? { score: { $meta: 'textScore' } } : {})
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .exec(),
      VenueModel.countDocuments(filter).exec(),
    ]);
    return { data, total };
  }

  async findNearby(query: INearbyQuery) {
    const { latitude, longitude, radius, page = 1, limit = 10 } = query;
    const radiusInMeters = radius * 1000;
    const filter = {
      status: VenueStatus.APPROVED,
      isDeleted: false,
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [longitude, latitude] },
          $maxDistance: radiusInMeters,
        },
      },
    };
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      VenueModel.find(filter).skip(skip).limit(limit).exec(),
      VenueModel.countDocuments({ status: VenueStatus.APPROVED, isDeleted: false }).exec(),
    ]);
    return { data, total };
  }

  async findFeatured(): Promise<IVenueDocument[]> {
    return VenueModel.find({
      status: VenueStatus.APPROVED,
      isFeatured: true,
      isDeleted: false,
    }).sort({ averageRating: -1 }).limit(20).exec();
  }

  async findPopular(): Promise<IVenueDocument[]> {
    return VenueModel.find({
      status: VenueStatus.APPROVED,
      isDeleted: false,
    }).sort({ totalReviews: -1, averageRating: -1 }).limit(20).exec();
  }

  async findAll(page: number, limit: number, status?: VenueStatus) {
    const filter: Record<string, unknown> = { isDeleted: false };
    if (status) filter['status'] = status;
    const [data, total] = await Promise.all([
      VenueModel.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).exec(),
      VenueModel.countDocuments(filter).exec(),
    ]);
    return { data, total };
  }
}
