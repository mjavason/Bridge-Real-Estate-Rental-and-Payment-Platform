// bid.dto.ts
import { IsNumber, IsString, IsBoolean, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';

export const bidStatuses = ['pending', 'awaiting_payment', 'paid', 'rejected', 'counter_bid'];

export class CreateBidDTO {
  @IsNotEmpty()
  @IsNumber()
  amount!: number;

  @IsNotEmpty()
  @IsEnum(bidStatuses)
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
  @IsEnum(bidStatuses)
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
  @IsEnum(bidStatuses)
  status?: string;
}
