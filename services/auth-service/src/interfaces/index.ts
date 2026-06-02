export enum Role {
  USER = 'USER',
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
}

export enum Status {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  SUSPENDED = 'SUSPENDED',
}

export interface ITokenPayload {
  userId: string;
  role: Role;
}

export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface IRegisterUserDTO {
  email: string;
  password: string;
}

export interface IRegisterOwnerDTO {
  email: string;
  password: string;
  businessName: string;
  ownerName: string;
  phone: string;
  address: string;
}

export interface ILoginDTO {
  email: string;
  password: string;
}

export interface IResetPasswordDTO {
  email: string;
  otp: string;
  newPassword: string;
}

export interface IVerifyOtpDTO {
  email: string;
  otp: string;
}

export interface ISafeUser {
  id: string;
  email: string;
  role: Role;
  status: Status;
  isVerified: boolean;
  createdAt: Date;
}
