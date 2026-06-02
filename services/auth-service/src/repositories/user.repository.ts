import mongoose from 'mongoose';
import { UserModel, IUserDocument } from '../models/user.model';
import { OtpModel, IOtpDocument } from '../models/otp.model';
import { IRegisterUserDTO, IRegisterOwnerDTO, Role, Status } from '../interfaces';

export class UserRepository {
  async findByEmail(email: string): Promise<IUserDocument | null> {
    return UserModel.findOne({ email: email.toLowerCase() }).exec();
  }

  async findById(id: string): Promise<IUserDocument | null> {
    if (!mongoose.isValidObjectId(id)) return null;
    return UserModel.findById(id).exec();
  }

  async createUser(dto: IRegisterUserDTO): Promise<IUserDocument> {
    return UserModel.create({
      email: dto.email,
      password: dto.password,
      role: Role.USER,
      status: Status.ACTIVE,
    });
  }

  async createOwner(dto: IRegisterOwnerDTO & { hashedPassword: string }): Promise<IUserDocument> {
    return UserModel.create({
      email: dto.email,
      password: dto.hashedPassword,
      role: Role.OWNER,
      status: Status.PENDING,
      ownerProfile: {
        businessName: dto.businessName,
        ownerName: dto.ownerName,
        phone: dto.phone,
        address: dto.address,
      },
    });
  }

  async updateRefreshToken(userId: string, token: string | null): Promise<void> {
    await UserModel.findByIdAndUpdate(userId, { refreshToken: token }).exec();
  }

  async updatePassword(userId: string, hashedPassword: string): Promise<void> {
    await UserModel.findByIdAndUpdate(userId, { password: hashedPassword }).exec();
  }

  async markVerified(userId: string): Promise<void> {
    await UserModel.findByIdAndUpdate(userId, { isVerified: true }).exec();
  }

  async upsertOtp(userId: string, otpHash: string, expiresAt: Date): Promise<void> {
    const objectId = new mongoose.Types.ObjectId(userId);
    await OtpModel.findOneAndUpdate(
      { userId: objectId },
      { otpHash, expiresAt },
      { upsert: true, new: true }
    ).exec();
  }

  async findOtp(userId: string): Promise<IOtpDocument | null> {
    const objectId = new mongoose.Types.ObjectId(userId);
    return OtpModel.findOne({ userId: objectId }).exec();
  }

  async deleteOtp(userId: string): Promise<void> {
    const objectId = new mongoose.Types.ObjectId(userId);
    await OtpModel.deleteOne({ userId: objectId }).exec();
  }
}
