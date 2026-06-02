import { IPaginatedResult } from '../interfaces';

export const paginate = <T>(
  data: T[],
  total: number,
  page: number,
  limit: number
): IPaginatedResult<T> => ({
  data,
  total,
  page,
  limit,
  totalPages: Math.ceil(total / limit),
});

export const getPaginationParams = (
  rawPage?: string | number,
  rawLimit?: string | number
): { page: number; limit: number; skip: number } => {
  const page = Math.max(1, parseInt(String(rawPage || 1), 10));
  const limit = Math.min(50, Math.max(1, parseInt(String(rawLimit || 10), 10)));
  return { page, limit, skip: (page - 1) * limit };
};
