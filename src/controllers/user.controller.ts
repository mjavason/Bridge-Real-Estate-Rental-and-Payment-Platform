import { Request, Response } from 'express';
import { SuccessResponse, InternalErrorResponse, NotFoundResponse } from '../helpers/response';
import { MESSAGES } from '../constants';
import {
  controller,
  httpDelete,
  httpGet,
  httpPatch,
  httpPost,
  request,
  response,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { UserService } from '../services';

import isAuth from '../middleware/is_auth.middleware';
import isAdmin from '../middleware/is_admin.middleware';
import { CreateUserDTO, FindUserDTO, UpdateUserDTO } from '../dto/user.dto';
import { validateQueryDTO } from '../middleware/query.validation.middleware';
import { validateBodyDTO } from '../middleware/body.validation.middleware';
import { validateParamsDTO } from '../middleware/params.validation.middleware';
import { UniqueIdDTO } from '../dto/unique_id.dto';

@controller('/user', isAuth)
export class UserController {
  constructor(@inject(UserService) private userService: UserService) {}

  @httpPost('/', validateBodyDTO(CreateUserDTO))
  async create(@request() req: Request, @response() res: Response) {
    try {
      const data = await this.userService.create(req.body);

      if (!data) return InternalErrorResponse(res);

      return SuccessResponse(res, data);
    } catch (error: any) {
      return InternalErrorResponse(res, error.message);
    }
  }

  @httpGet('/', validateQueryDTO(FindUserDTO))
  async find(@request() req: Request, @response() res: Response) {
    try {
      console.log(req.query);
      const data = await this.userService.find(req.query);

      if (!data) return InternalErrorResponse(res);
      if (data.length === 0) return NotFoundResponse(res);

      return SuccessResponse(res, data);
    } catch (error: any) {
      return InternalErrorResponse(res, error.message);
    }
  }

  @httpGet('/profile')
  async getUserProfile(@request() req: Request, @response() res: Response) {
    try {
      const data = await this.userService.findOne({ id: res.locals.user.id });

      if (!data) return NotFoundResponse(res);

      return SuccessResponse(res, data);
    } catch (error: any) {
      return InternalErrorResponse(res, error.message);
    }
  }

  @httpGet('/exists', validateQueryDTO(FindUserDTO))
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

  @httpGet('/count', validateQueryDTO(FindUserDTO))
  async getCount(@request() req: Request, @response() res: Response) {
    try {
      const data = await this.userService.count(req.query);

      // If nothing exists, return 0 as the count
      if (!data) return SuccessResponse(res, { data: 0 });

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

      const data = await this.userService.getAll(pagination);

      if (!data) return InternalErrorResponse(res);
      if (data.length === 0) return NotFoundResponse(res);

      return SuccessResponse(res, data);
    } catch (error: any) {
      return InternalErrorResponse(res, error.message);
    }
  }

  @httpPatch('/', validateBodyDTO(UpdateUserDTO))
  async update(@request() req: Request, @response() res: Response) {
    try {
      if (req.body.password) {
        const hashedPassword = await this.userService.hashPassword(req.body.password);
        req.body.password = hashedPassword;
      }

      const data = await this.userService.update({ id: res.locals.user.id }, req.body);

      if (!data) return NotFoundResponse(res);

      return SuccessResponse(res, data, MESSAGES.UPDATED);
    } catch (error: any) {
      return InternalErrorResponse(res, error.message);
    }
  }

  @httpDelete('/')
  async delete(@request() req: Request, @response() res: Response) {
    try {
      const data = await this.userService.softDelete({ id: res.locals.user.id });

      if (!data) return NotFoundResponse(res);

      return SuccessResponse(res, data, MESSAGES.DELETED);
    } catch (error: any) {
      return InternalErrorResponse(res, error.message);
    }
  }

  // Admins only
  @httpDelete('/hard/:id', isAdmin, validateParamsDTO(UniqueIdDTO))
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
