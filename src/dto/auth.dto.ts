import { IsString, IsEmail, MinLength, IsEnum, IsNotEmpty } from 'class-validator';
import { UserRoles } from './user.dto';

export class RegisterUserDTO {
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
  @IsString()
  @MinLength(5)
  password!: string;
}

// Define a DTO for user login
export class LoginDTO {
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  password!: string;
}

// Define a DTO for resetting the user's password via email
export class ResetPasswordEmailDTO {
  @IsNotEmpty()
  @IsEmail()
  email!: string;
}

// Define a DTO for resetting the user's password with a token
export class ResetPasswordTokenDTO {
  @IsNotEmpty()
  @IsString()
  token!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  newPassword!: string;
}
