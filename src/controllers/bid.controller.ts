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
import { BidService, HouseService, UserService } from '../services';

import isAuth from '../middleware/is_auth.middleware';
import isAdmin from '../middleware/is_admin.middleware';
import { UniqueIdDTO } from '../dto/unique_id.dto';
import { validateParamsDTO } from '../middleware/params.validation.middleware';
import { validateBodyDTO } from '../middleware/body.validation.middleware';
import { BidStatuses, CreateBidDTO, FindBidDTO, UpdateBidDTO } from '../dto/bid.dto';
import { validateQueryDTO } from '../middleware/query.validation.middleware';
import { MailController } from './mail.controller';
import isTenant from '../middleware/is_tenant.middleware';
import sequelize from 'sequelize/types/sequelize';
import logger from '../helpers/logger';

@controller('/bid', isAuth)
export class BidController {
  constructor(
    @inject(BidService) private bidService: BidService,
    @inject(HouseService) private houseService: HouseService,
    @inject(UserService) private userService: UserService,
    @inject(MailController) private mailController: MailController,
  ) {}

  @httpPost('/', validateBodyDTO(CreateBidDTO), isTenant)
  async create(@request() req: Request, @response() res: Response) {
    try {
      req.body.UserId = res.locals.user.id;
      const data = await this.bidService.create(req.body);

      if (!data) return InternalErrorResponse(res, 'Unable to create bid. Ensure House exists');

      const houseData = await this.houseService.findOne({ id: req.body.HouseId });

      if (houseData) {
        // send mail notifying both tenant and landlord of bid
        this.mailController.sendBidCreatedMail(
          res.locals.user.email,
          houseData?.User.email,
          houseData?.title,
          data?.status,
        );
      } else {
        console.log('Unable to send bid creation mail. House not found.');
      }

      return SuccessResponse(res, data);
    } catch (error: any) {
      return InternalErrorResponse(res, error.message);
    }
  }

  @httpPost('/:id/pay', validateParamsDTO(UniqueIdDTO))
  async makePayment(@request() req: Request, @response() res: Response) {
    try {
      const { id } = req.params;
      const data = await this.bidService.update(
        { id: id, status: BidStatuses.AWAITING_PAYMENT },
        { status: BidStatuses.PAID },
      );

      if (!data) return NotFoundResponse(res, 'Bid with awaiting payment status not found');

      // Increment landlords balance
      const landlordData = await this.userService.incrementAccountBalance(
        { id: data.House.User.id },
        data.amount,
      );

      if (!landlordData) logger.error('Issue occured with updating landlords balance');

      //send mail notifying both tenant and landlord of bid update
      this.mailController.sendBidUpdateMail(
        data?.User.email,
        data?.House.User.email,
        data?.House.title,
        data?.status,
      );

      return SuccessResponse(res, data, 'House paid for successfully');
    } catch (error: any) {
      return InternalErrorResponse(res, error.message);
    }
  }

  @httpGet('/exists', validateQueryDTO(FindBidDTO))
  async exists(@request() req: Request, @response() res: Response) {
    try {
      const data = await this.bidService.exists(req.query);

      // If nothing exists, return 0 as the count
      if (!data) return SuccessResponse(res, []);

      return SuccessResponse(res, data);
    } catch (error: any) {
      return InternalErrorResponse(res, error.message);
    }
  }

  @httpGet('/count', validateQueryDTO(FindBidDTO))
  async getCount(@request() req: Request, @response() res: Response) {
    try {
      const data = await this.bidService.count(req.query);

      // If nothing exists, return 0 as the count
      if (!data) return SuccessResponse(res, { data: 0 });

      return SuccessResponse(res, data);
    } catch (error: any) {
      return InternalErrorResponse(res, error.message);
    }
  }

  @httpGet('/search', validateQueryDTO(FindBidDTO))
  async find(@request() req: Request, @response() res: Response) {
    try {
      const data = await this.bidService.find(req.query);

      if (!data) return InternalErrorResponse(res);
      if (data.length === 0) return NotFoundResponse(res);

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

      const data = await this.bidService.getAll(pagination);

      if (!data) return InternalErrorResponse(res);
      if (data.length === 0) return NotFoundResponse(res);

      return SuccessResponse(res, data);
    } catch (error: any) {
      return InternalErrorResponse(res, error.message);
    }
  }

  @httpPatch('/:id', validateParamsDTO(UniqueIdDTO), validateBodyDTO(UpdateBidDTO))
  async update(@request() req: Request, @response() res: Response) {
    try {
      const { id } = req.params;
      const data = await this.bidService.update({ id: id }, req.body);

      if (!data) return NotFoundResponse(res);

      //send mail notifying both tenant and landlord of bid update
      this.mailController.sendBidUpdateMail(
        data?.User.email,
        data?.House.User.email,
        data?.House.title,
        data?.status,
      );

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
      const data = await this.bidService.hardDelete({ id: id });

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
      const data = await this.bidService.softDelete({ id: id });

      if (!data) return NotFoundResponse(res);

      return SuccessResponse(res, data, MESSAGES.DELETED);
    } catch (error: any) {
      return InternalErrorResponse(res, error.message);
    }
  }
}
