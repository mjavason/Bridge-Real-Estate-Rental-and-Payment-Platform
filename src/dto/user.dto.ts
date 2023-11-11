import {
  IsString,
  IsEmail,
  IsEnum,
  MinLength,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export enum UserRoles {
  TENANT = 'tenant',
  ADMIN = 'admin',
  LANDLORD = 'landlord',
}

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  firstName!: string;

  @IsNotEmpty()
  @IsString()
  lastName!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsEnum(UserRoles)
  role!: string;

  @IsNotEmpty()
  @IsNumber()
  accountBalance!: number;

  @IsNotEmpty()
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
  @IsEnum(UserRoles)
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
  @IsEnum(UserRoles)
  role?: string;

  @IsOptional()
  @IsString()
  accountBalance?: number;
}
