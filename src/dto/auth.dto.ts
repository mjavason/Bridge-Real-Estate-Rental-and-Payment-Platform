import { IsString, IsEmail, MinLength, IsEnum } from 'class-validator';

// Define a DTO for user registration
export class RegisterUserDTO {
  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsEmail()
  email!: string;

  @IsEnum(['user', 'admin'])
  role!: string;

  @IsString()
  @MinLength(5)
  password!: string;
}

// Define a DTO for user login
export class LoginDTO {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(5)
  password!: string;
}

// Define a DTO for resetting the user's password via email
export class ResetPasswordEmailDTO {
  @IsEmail()
  email!: string;
}

// Define a DTO for resetting the user's password with a token
export class ResetPasswordTokenDTO {
  @IsString()
  token!: string;

  @IsString()
  @MinLength(5)
  newPassword!: string;
}