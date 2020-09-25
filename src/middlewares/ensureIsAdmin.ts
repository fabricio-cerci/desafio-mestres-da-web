import { Request, Response, NextFunction } from 'express';

import AppError from '../errors/AppError';

export default function ensureIsAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const { user } = request;

  if (!user) {
    throw new AppError('User not authenticated', 401);
  }

  if (!user.isAdmin) {
    throw new AppError('User does not have permission for that action', 401);
  }

  return next();
}
