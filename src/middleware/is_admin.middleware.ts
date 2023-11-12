import { NextFunction, Request, Response } from 'express';
import { AuthFailureResponse } from '../helpers/response';

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const loggedInUser = res.locals.user;

  if (loggedInUser && loggedInUser.role !== 'admin') return next();

  console.log('Invalid login details, not admin');
  return AuthFailureResponse(res, 'Unauthorized! This is only for admins');
};

export default isAdmin;
