import { Request, Response } from 'express';
import { SuccessResponse, InternalErrorResponse, NotFoundResponse } from '../helpers/response';
import { MESSAGES } from '../constants';
import {
  controller,
  //   httpDelete,
  httpGet,
  //   httpPost,
  request,
  response,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { HouseService } from '../services/house.service';

import isAuth from '../middleware/is_auth.middleware';

@controller('/house', isAuth)
export class HouseController {
  constructor(@inject(HouseService) private houseService: HouseService) {}

  //   @httpPost('/')
  async create(@request() req: Request, @response() res: Response) {
    try {
      const data = await this.houseService.create(req.body);

      if (!data) return InternalErrorResponse(res);

      return SuccessResponse(res, data);
    } catch (error: any) {
      return InternalErrorResponse(res, error.message);
    }
  }

  @httpGet('/')
  async getHouseProfile(@request() req: Request, @response() res: Response) {
    try {
      const data = await this.houseService.findOne({ id: res.locals.house.id });

      if (!data) return NotFoundResponse(res);

      return SuccessResponse(res, data);
    } catch (error: any) {
      return InternalErrorResponse(res, error.message);
    }
  }

  //   @httpGet('/:pagination')
  async getAll(@request() req: Request, @response() res: Response) {
    try {
      let pagination = parseInt(req.params.pagination);

      if (!pagination) pagination = 1;

      pagination = (pagination - 1) * 10;

      const data = await this.houseService.getAll(pagination);

      if (!data) return InternalErrorResponse(res);
      if (data.length === 0) return NotFoundResponse(res);

      return SuccessResponse(res, data);
    } catch (error: any) {
      return InternalErrorResponse(res, error.message);
    }
  }

  //   @httpGet('/exists')
  async exists(@request() req: Request, @response() res: Response) {
    try {
      const data = await this.houseService.exists(req.query);

      // If nothing exists, return 0 as the count
      if (!data) return SuccessResponse(res, []);

      return SuccessResponse(res, data);
    } catch (error: any) {
      return InternalErrorResponse(res, error.message);
    }
  }

  //   @httpGet('/count')
  async getCount(@request() req: Request, @response() res: Response) {
    try {
      const data = await this.houseService.getCount(req.query);

      // If nothing exists, return 0 as the count
      if (!data) return SuccessResponse(res, { data: 0 });

      return SuccessResponse(res, data);
    } catch (error: any) {
      return InternalErrorResponse(res, error.message);
    }
  }

  //   @httpGet('/')
  async find(@request() req: Request, @response() res: Response) {
    try {
      const data = await this.houseService.find(req.query);

      if (!data) return InternalErrorResponse(res);
      if (data.length === 0) return NotFoundResponse(res);

      return SuccessResponse(res, data);
    } catch (error: any) {
      return InternalErrorResponse(res, error.message);
    }
  }

  //   @httpPost('/:id')
  async update(@request() req: Request, @response() res: Response) {
    try {
      const { id } = req.params;
      const data = await this.houseService.update({ id: id }, req.body);

      if (!data) return NotFoundResponse(res);

      return SuccessResponse(res, data, MESSAGES.UPDATED);
    } catch (error: any) {
      return InternalErrorResponse(res, error.message);
    }
  }

  //   @httpDelete('/:id')
  async delete(@request() req: Request, @response() res: Response) {
    try {
      const { id } = req.params;
      const data = await this.houseService.softDelete({ id: id });

      if (!data) return NotFoundResponse(res);

      return SuccessResponse(res, data, MESSAGES.DELETED);
    } catch (error: any) {
      return InternalErrorResponse(res, error.message);
    }
  }

  // Admins only
  //   @httpDelete('/hard/:id')
  async hardDelete(@request() req: Request, @response() res: Response) {
    try {
      const { id } = req.params;
      const data = await this.houseService.hardDelete({ id: id });

      if (!data) return NotFoundResponse(res);

      return SuccessResponse(res, data, MESSAGES.DELETED);
    } catch (error: any) {
      return InternalErrorResponse(res, error.message);
    }
  }
}
