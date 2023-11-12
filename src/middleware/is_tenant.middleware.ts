import { NextFunction, Request, Response } from 'express';
import { AuthFailureResponse } from '../helpers/response';
import cacheMiddleware from './cache.middleware';

const isTenant = async (req: Request, res: Response, next: NextFunction) => {
  const loggedInUser = res.locals.user;

  if (loggedInUser.role === 'tenant' || loggedInUser.role === 'admin'){
    cacheMiddleware(req, res, next);
    return next();
  }

  console.log('Unauthorized! Not Tenant');
  return AuthFailureResponse(res, 'Unauthorized! This is for tenants only');
};

export default isTenant;
