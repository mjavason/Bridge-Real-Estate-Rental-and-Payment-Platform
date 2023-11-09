import { Request, Response } from 'express';
import { STATUS_CODES, MESSAGES } from '../constants';

// Handle 404 route not found errors
export default function handleRouteNotFound(req: Request, res: Response) {
  return res
    .status(404)
    .send({ status_code: STATUS_CODES.FAILURE, message: MESSAGES.ROUTE_NOT_FOUND, success: false });
}
