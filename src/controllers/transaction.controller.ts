import { Request, Response } from 'express';
import { SuccessResponse, InternalErrorResponse, NotFoundResponse } from '../helpers/response';
import { MESSAGES, REDIS_OPTIONS } from '../constants';
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  request,
  response,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { TransactionService } from '../services';

import isAuth from '../middleware/is_auth.middleware';
import isAdmin from '../middleware/is_admin.middleware';
import { UniqueIdDTO } from '../dto/unique_id.dto';
import { validateParamsDTO } from '../middleware/params.validation.middleware';
import redisClient from '../config/redis';
import {
  CreateTransactionDTO,
  UpdateTransactionDTO,
  FindTransactionDTO,
} from '../dto/transaction.dto'; // Import the newly created DTOs
import { validateBodyDTO } from '../middleware/body.validation.middleware';
import { validateQueryDTO } from '../middleware/query.validation.middleware';

@controller('/transaction', isAuth)
export class TransactionController {
  constructor(@inject(TransactionService) private transactionService: TransactionService) {}

  @httpPost('/', validateBodyDTO(CreateTransactionDTO))
  async create(@request() req: Request, @response() res: Response) {
    try {
      const data = await this.transactionService.create(req.body);

      if (!data)
        return InternalErrorResponse(
          res,
          'Unable to create transaction entry. Ensure all users exist',
        );

      return SuccessResponse(res, data);
    } catch (error: any) {
      return InternalErrorResponse(res, error.message);
    }
  }

  @httpGet('/exists', validateQueryDTO(FindTransactionDTO))
  async exists(@request() req: Request, @response() res: Response) {
    try {
      const data = await this.transactionService.exists(req.query);

      // If nothing exists, return 0 as the count
      if (!data) return SuccessResponse(res, []);

      // Save data to cache
      const key = req.originalUrl || req.url;
      redisClient.set(key, JSON.stringify(data), REDIS_OPTIONS);

      return SuccessResponse(res, data);
    } catch (error: any) {
      return InternalErrorResponse(res, error.message);
    }
  }

  @httpGet('/count', validateQueryDTO(FindTransactionDTO))
  async getCount(@request() req: Request, @response() res: Response) {
    try {
      const data = await this.transactionService.count(req.query);

      // If nothing exists, return 0 as the count
      if (!data) return SuccessResponse(res, { data: 0 });

      // Save data to cache
      const key = req.originalUrl || req.url;
      redisClient.set(key, JSON.stringify(data), REDIS_OPTIONS);

      return SuccessResponse(res, data);
    } catch (error: any) {
      return InternalErrorResponse(res, error.message);
    }
  }

  @httpGet('/', validateQueryDTO(FindTransactionDTO))
  async find(@request() req: Request, @response() res: Response) {
    try {
      const data = await this.transactionService.find(req.query);

      if (!data) return InternalErrorResponse(res);
      if (data.length === 0) return NotFoundResponse(res);

      // Save data to cache
      const key = req.originalUrl || req.url;
      redisClient.set(key, JSON.stringify(data), REDIS_OPTIONS);

      return SuccessResponse(res, data);
    } catch (error: any) {
      return InternalErrorResponse(res, error.message);
    }
  }

  @httpGet('/:pagination', validateParamsDTO(FindTransactionDTO))
  async getAll(@request() req: Request, @response() res: Response) {
    try {
      let pagination = parseInt(req.params.pagination);

      if (!pagination) pagination = 1;

      pagination = (pagination - 1) * 10;

      const data = await this.transactionService.getAll(pagination);

      if (!data) return InternalErrorResponse(res);
      if (data.length === 0) return NotFoundResponse(res);

      // Save data to cache
      const key = req.originalUrl || req.url;
      redisClient.set(key, JSON.stringify(data), REDIS_OPTIONS);

      return SuccessResponse(res, data);
    } catch (error: any) {
      return InternalErrorResponse(res, error.message);
    }
  }

  @httpPost('/:id', validateParamsDTO(UniqueIdDTO), validateBodyDTO(UpdateTransactionDTO))
  async update(@request() req: Request, @response() res: Response) {
    try {
      const { id } = req.params;
      const data = await this.transactionService.update({ id: id }, req.body);

      if (!data) return NotFoundResponse(res);

      return SuccessResponse(res, data, MESSAGES.UPDATED);
    } catch (error: any) {
      return InternalErrorResponse(res, error.message);
    }
  }

  // Admins only
  @httpDelete('/hard/:id', validateParamsDTO(UniqueIdDTO), isAdmin)
  async hardDelete(@request() req: Request, @response() res: Response) {
    try {
      const { id } = req.params;
      const data = await this.transactionService.hardDelete({ id: id });

      if (!data) return NotFoundResponse(res);

      return SuccessResponse(res, data, MESSAGES.DELETED);
    } catch (error: any) {
      return InternalErrorResponse(res, error.message);
    }
  }

  @httpDelete('/:id', validateParamsDTO(UniqueIdDTO))
  async delete(@request() req: Request, @response() res: Response) {
    try {
      const { id } = req.params;
      const data = await this.transactionService.softDelete({ id: id });

      if (!data) return NotFoundResponse(res);

      return SuccessResponse(res, data, MESSAGES.DELETED);
    } catch (error: any) {
      return InternalErrorResponse(res, error.message);
    }
  }
}
