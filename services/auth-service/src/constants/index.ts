export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_ERROR: 500,
} as const;

export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_TAKEN: 'Email already in use',
  USER_NOT_FOUND: 'User not found',
  ACCOUNT_SUSPENDED: 'Account has been suspended',
  EMAIL_NOT_VERIFIED: 'Please verify your email before logging in',
  INVALID_TOKEN: 'Invalid or expired token',
  INVALID_OTP: 'Invalid or expired OTP',
  TOKEN_REQUIRED: 'Authentication token required',
  FORBIDDEN: 'Insufficient permissions',
  VALIDATION_ERROR: 'Validation failed',
} as const;

export const SUCCESS_MESSAGES = {
  REGISTERED: 'Registration successful. Please verify your email.',
  OWNER_REGISTERED: 'Owner registration successful. Awaiting admin approval.',
  LOGIN: 'Login successful',
  LOGOUT: 'Logout successful',
  TOKEN_REFRESHED: 'Token refreshed successfully',
  OTP_SENT: 'OTP sent to your email',
  OTP_VERIFIED: 'OTP verified successfully',
  PASSWORD_RESET: 'Password reset successfully',
} as const;

export const REDIS_KEYS = {
  refreshToken: (userId: string) => `refresh_token:${userId}`,
  otp: (email: string) => `otp:${email}`,
} as const;
