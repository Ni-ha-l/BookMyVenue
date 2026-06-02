import { body, param } from 'express-validator';

export const createProfileValidator = [
  body('firstName')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({ max: 50 }).withMessage('First name must be under 50 characters'),
  body('lastName')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .isLength({ max: 50 }).withMessage('Last name must be under 50 characters'),
  body('phone')
    .optional()
    .trim()
    .isMobilePhone('any').withMessage('Invalid phone number'),
  body('city').optional().trim().isLength({ max: 100 }).withMessage('City must be under 100 characters'),
  body('state').optional().trim().isLength({ max: 100 }).withMessage('State must be under 100 characters'),
  body('country').optional().trim().isLength({ max: 100 }).withMessage('Country must be under 100 characters'),
  body('bio').optional().trim().isLength({ max: 500 }).withMessage('Bio must be under 500 characters'),
];

export const updateProfileValidator = [
  body('firstName')
    .optional()
    .trim()
    .notEmpty().withMessage('First name cannot be empty')
    .isLength({ max: 50 }).withMessage('First name must be under 50 characters'),
  body('lastName')
    .optional()
    .trim()
    .notEmpty().withMessage('Last name cannot be empty')
    .isLength({ max: 50 }).withMessage('Last name must be under 50 characters'),
  body('phone')
    .optional()
    .trim()
    .isMobilePhone('any').withMessage('Invalid phone number'),
  body('gender')
    .optional()
    .isIn(['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY']).withMessage('Invalid gender value'),
  body('dateOfBirth')
    .optional()
    .isISO8601().withMessage('Date of birth must be a valid date (YYYY-MM-DD)')
    .custom((val) => new Date(val) < new Date()).withMessage('Date of birth must be in the past'),
  body('city').optional().trim().isLength({ max: 100 }).withMessage('City must be under 100 characters'),
  body('state').optional().trim().isLength({ max: 100 }).withMessage('State must be under 100 characters'),
  body('country').optional().trim().isLength({ max: 100 }).withMessage('Country must be under 100 characters'),
  body('bio').optional().trim().isLength({ max: 500 }).withMessage('Bio must be under 500 characters'),
];

export const updatePreferencesValidator = [
  body('emailNotifications').optional().isBoolean().withMessage('emailNotifications must be a boolean'),
  body('pushNotifications').optional().isBoolean().withMessage('pushNotifications must be a boolean'),
  body('marketingEmails').optional().isBoolean().withMessage('marketingEmails must be a boolean'),
];

export const venueIdParamValidator = [
  param('venueId')
    .trim()
    .notEmpty().withMessage('venueId is required')
    .isLength({ min: 1, max: 100 }).withMessage('Invalid venueId'),
];
