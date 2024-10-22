import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export enum RequestRole {
  ACCEPTED = 'accepted',
  PENDING = 'pending',
  REJECTED = 'rejected',
}

export class RequestDto {
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  requestPurpose: string;

  @IsEnum(RequestRole)
  @IsNotEmpty()
  status: RequestRole;

  @IsNotEmpty()
  @IsDateString()
  requestDate: Date;
}

export class UpdateRequestDto {
  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsString()
  @IsOptional()
  requestPurpose?: string;

  @IsEnum(RequestRole)
  @IsNotEmpty()
  status?: RequestRole;
}
