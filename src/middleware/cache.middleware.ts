import { Request, Response, NextFunction } from 'express';
import redisClient from '../config/redis';
import { SuccessMsgResponse, SuccessResponse } from '../helpers/response';

const cacheMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const key = req.originalUrl || req.url;

  try {
    const cachedData = await redisClient.get(key);

    if (cachedData) {
      return SuccessResponse(res, JSON.parse(cachedData));
    } else {
      // Continue with the next middleware/route handler
      next();
    }
  } catch (error) {
    console.error('Error checking cache:', error);
    next();
  }
};

export default cacheMiddleware;
