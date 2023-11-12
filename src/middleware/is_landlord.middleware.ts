import { NextFunction, Request, Response } from 'express';
import { AuthFailureResponse } from '../helpers/response';
import cacheMiddleware from './cache.middleware';

const isLandlord = async (req: Request, res: Response, next: NextFunction) => {
  const loggedInUser = res.locals.user;

  if (loggedInUser.role === 'landlord' || loggedInUser.role === 'admin') {
    cacheMiddleware(req, res, next);
    return next();
  }

  console.log('Unauthorized. Not landlord');
  return AuthFailureResponse(res, 'Unauthorized! This is for landlords only');
};

export default isLandlord;
