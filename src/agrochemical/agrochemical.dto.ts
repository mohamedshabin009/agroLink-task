import {
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class AgroChemicalCreateDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  suitableCrop: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  @IsDecimal()
  pricePerUnit: string;

  @IsString()
  @IsNotEmpty()
  image: string;
}

export class UpdateAgroDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  brand: string;

  @IsString()
  @IsOptional()
  category: string;

  @IsString()
  @IsOptional()
  suitableCrop: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  quantity: number;

  @IsString()
  @IsOptional()
  @IsDecimal()
  pricePerUnit: string;

  @IsString()
  @IsOptional()
  image: string;
}
