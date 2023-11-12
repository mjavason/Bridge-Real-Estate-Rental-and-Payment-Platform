// bid.dto.ts
import { IsNumber, IsString, IsBoolean, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';

export enum BidStatuses {
  PENDING = 'pending',
  AWAITING_PAYMENT = 'awaiting payment',
  PAID = 'paid',
  REJECTED = 'rejected',
  COUNTER_BID = 'counter bid',
}

export class CreateBidDTO {
  @IsNotEmpty()
  @IsNumber()
  amount!: number;

  @IsNotEmpty()
  @IsEnum(BidStatuses)
  status!: string;

  @IsNotEmpty()
  @IsNumber()
  HouseId?: number;
}

export class UpdateBidDTO {
  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsEnum(BidStatuses)
  status?: string;

  @IsOptional()
  @IsBoolean()
  deleted?: boolean;
}

export class FindBidDTO {
  @IsOptional()
  @IsString()
  id?: number;

  @IsOptional()
  @IsString()
  HouseId?: number;

  @IsOptional()
  @IsString()
  UserId?: number;

  @IsOptional()
  @IsString()
  amount?: number;

  @IsOptional()
  @IsEnum(BidStatuses)
  status?: string;
}
