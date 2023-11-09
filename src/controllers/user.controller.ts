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
import { UserService } from '../services/user.service';

import isAuth from '../middleware/is_auth.middleware';

@controller('/user', isAuth)
export class UserController {
  constructor(@inject(UserService) private userService: UserService) {}

  //   @httpPost('/')
  async create(@request() req: Request, @response() res: Response) {
    try {
      const data = await this.userService.create(req.body);

      if (!data) return InternalErrorResponse(res);

      return SuccessResponse(res, data);
    } catch (error: any) {
      return InternalErrorResponse(res, error.message);
    }
  }

  @httpGet('/')
  async getUserProfile(@request() req: Request, @response() res: Response) {
    try {
      const data = await this.userService.findOne({ id: res.locals.user.id });

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

      const data = await this.userService.getAll(pagination);

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
      const data = await this.userService.exists(req.query);

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
      const data = await this.userService.getCount(req.query);

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
      const data = await this.userService.find(req.query);

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
      const data = await this.userService.update({ id: id }, req.body);

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
      const data = await this.userService.softDelete({ id: id });

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
      const data = await this.userService.hardDelete({ id: id });

      if (!data) return NotFoundResponse(res);

      return SuccessResponse(res, data, MESSAGES.DELETED);
    } catch (error: any) {
      return InternalErrorResponse(res, error.message);
    }
  }
}
