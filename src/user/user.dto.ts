import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export enum UserRole {
  FARMER = 'farmer',
  SELLER = 'seller',
}

export class UpdateUser {
  @IsPhoneNumber()
  @IsOptional()
  mobileNumber?: string;

  @IsString()
  @IsOptional()
  profileImage?: string;
}

export class UserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;

  @IsPhoneNumber()
  @IsNotEmpty()
  mobileNumber: string;

  @IsString()
  @IsNotEmpty()
  profileImage: string;
}
