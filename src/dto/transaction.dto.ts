import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsOptional, IsPositive } from 'class-validator';

export class CreateTransactionDTO {
  @IsNotEmpty()
  @IsNumber()
  senderId!: number;

  @IsNotEmpty()
  @IsNumber()
  recipientId!: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  amount!: number;
}

export class UpdateTransactionDTO {
  @IsOptional()
  @IsNumber()
  senderId?: number;

  @IsOptional()
  @IsNumber()
  recipientId?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  amount?: number;

  @IsOptional()
  @IsBoolean()
  deleted?: boolean;
}

export class FindTransactionDTO {
  @IsOptional()
  @IsString()
  id?: number;

  @IsOptional()
  @IsString()
  senderId?: number;

  @IsOptional()
  @IsNumber()
  recipientId?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  amount?: number;
}
