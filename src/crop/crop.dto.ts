import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CropDto {
  @IsString()
  @IsNotEmpty()
  cropName: string;

  @IsString()
  @IsNotEmpty()
  cropType: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  plantDate: Date;
}

export class UpdateCropDto {
  @IsString()
  @IsOptional()
  cropName?: string;

  @IsString()
  @IsOptional()
  cropType?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  plantDate?: Date;
}
