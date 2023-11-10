// validation.middleware.ts

import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { BadRequestResponseWithError } from '../helpers/response';

export function validateQueryDTO(dtoClass: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const dto: any = plainToInstance(dtoClass, req.query);

    validate(dto).then((errors) => {
      if (errors.length > 0) {
        const errorMessage = errors.map((error: any) => {
          return {
            [`${error.property}`]: {
              error: `${error.property} has wrong value ${error.value}.`,
              message: Object.values(error.constraints).join(', '),
            },
          };
        });

        return BadRequestResponseWithError(res, errorMessage);
      } else {
        req.query = dto;
        next();
      }
    });
  };
}
