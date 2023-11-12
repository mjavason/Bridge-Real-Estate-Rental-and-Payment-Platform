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
import { GalleryService } from '../services';

import isAuth from '../middleware/is_auth.middleware';
import isAdmin from '../middleware/is_admin.middleware';
import { UniqueIdDTO } from '../dto/unique_id.dto';
import { validateParamsDTO } from '../middleware/params.validation.middleware';
import redisClient from '../config/redis';

@controller('/gallery', isAuth)
export class GalleryController {
  constructor(@inject(GalleryService) private galleryService: GalleryService) {}

  @httpPost('/')
  async create(@request() req: Request, @response() res: Response) {
    try {
      const data = await this.galleryService.create(req.body);

      if (!data)
        return InternalErrorResponse(res, 'Unable to create gallery entry. Ensure House exists.');

      return SuccessResponse(res, data);
    } catch (error: any) {
      return InternalErrorResponse(res, error.message);
    }
  }

  @httpGet('/exists')
  async exists(@request() req: Request, @response() res: Response) {
    try {
      const data = await this.galleryService.exists(req.query);

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

  @httpGet('/count')
  async getCount(@request() req: Request, @response() res: Response) {
    try {
      const data = await this.galleryService.count(req.query);

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

  @httpGet('/')
  async find(@request() req: Request, @response() res: Response) {
    try {
      const data = await this.galleryService.find(req.query);

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

  @httpGet('/:pagination')
  async getAll(@request() req: Request, @response() res: Response) {
    try {
      let pagination = parseInt(req.params.pagination);

      if (!pagination) pagination = 1;

      pagination = (pagination - 1) * 10;

      const data = await this.galleryService.getAll(pagination);

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

  @httpPost('/:id', validateParamsDTO(UniqueIdDTO))
  async update(@request() req: Request, @response() res: Response) {
    try {
      const { id } = req.params;
      const data = await this.galleryService.update({ id: id }, req.body);

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
      const data = await this.galleryService.hardDelete({ id: id });

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
      const data = await this.galleryService.softDelete({ id: id });

      if (!data) return NotFoundResponse(res);

      return SuccessResponse(res, data, MESSAGES.DELETED);
    } catch (error: any) {
      return InternalErrorResponse(res, error.message);
    }
  }
}
