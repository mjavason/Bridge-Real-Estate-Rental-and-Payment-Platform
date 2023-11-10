import {
  IsString,
  IsEmail,
  IsEnum,
  MinLength,
  IsNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsEmail()
  email!: string;

  @IsEnum(['client', 'admin', 'landlord'])
  role!: string;

  @IsNumber()
  accountBalance!: number;

  @IsString()
  @MinLength(5)
  password!: string;
}

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEnum(['admin', 'client', 'landlord'])
  role?: string;

  @IsOptional()
  @IsNumber()
  accountBalance?: number;

  @IsOptional()
  @IsString()
  @MinLength(5)
  password?: string;

  @IsOptional()
  @IsBoolean()
  deleted?: boolean;
}

export class FindUserDTO {
  @IsOptional()
  @IsString()
  id?: number;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEnum(['client', 'admin', 'landlord'])
  role?: string;

  @IsOptional()
  @IsString()
  accountBalance?: number;
}
