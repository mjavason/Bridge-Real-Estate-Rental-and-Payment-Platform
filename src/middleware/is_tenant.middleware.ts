import { NextFunction, Request, Response } from 'express';
import { AuthFailureResponse } from '../helpers/response';

const isTenant = async (req: Request, res: Response, next: NextFunction) => {
  const loggedInUser = res.locals.user;

  if (loggedInUser.role === 'tenant' || loggedInUser.role === 'admin') return next();

  console.log('Unauthorized! Not Tenant');
  return AuthFailureResponse(res, 'Unauthorized! This is for tenants only');
};

export default isTenant;
