import { body } from 'express-validator';

const strongPassword = body('password')
  .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
  .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
  .matches(/[a-z]/).withMessage('Password must contain a lowercase letter')
  .matches(/[0-9]/).withMessage('Password must contain a number')
  .matches(/[^A-Za-z0-9]/).withMessage('Password must contain a special character');

const emailField = body('email').isEmail().normalizeEmail().withMessage('Valid email is required');

export const registerUserValidator = [emailField, strongPassword];

export const registerOwnerValidator = [
  emailField,
  strongPassword,
  body('businessName').trim().notEmpty().withMessage('Business name is required'),
  body('ownerName').trim().notEmpty().withMessage('Owner name is required'),
  body('phone').trim().isMobilePhone('any').withMessage('Valid phone number is required'),
  body('address').trim().notEmpty().withMessage('Address is required'),
];

export const loginValidator = [
  emailField,
  body('password').notEmpty().withMessage('Password is required'),
];

export const forgotPasswordValidator = [emailField];

export const verifyOtpValidator = [
  emailField,
  body('otp').isLength({ min: 6, max: 6 }).isNumeric().withMessage('OTP must be a 6-digit number'),
];

export const resetPasswordValidator = [
  emailField,
  body('otp').isLength({ min: 6, max: 6 }).isNumeric().withMessage('OTP must be a 6-digit number'),
  body('newPassword')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/[A-Z]/).withMessage('Must contain uppercase')
    .matches(/[a-z]/).withMessage('Must contain lowercase')
    .matches(/[0-9]/).withMessage('Must contain number')
    .matches(/[^A-Za-z0-9]/).withMessage('Must contain special character'),
];

export const refreshTokenValidator = [
  body('refreshToken').notEmpty().withMessage('Refresh token is required'),
];
