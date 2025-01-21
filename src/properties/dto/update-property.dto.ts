import {
  IsString,
  IsInt,
  IsOptional,
  IsEnum,
  IsArray,
  IsNumber,
} from 'class-validator';
import {
  PropertyType,
  ParkingType,
  LaundryType,
  ACType,
} from '../entities/property.entity'; // Import your enums

export class UpdatePropertyDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  buildYear?: number;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  stateOrRegion?: string;

  @IsOptional()
  @IsString()
  zip?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsEnum(PropertyType)
  type?: PropertyType;

  @IsOptional()
  @IsInt()
  beds?: number;

  @IsOptional()
  @IsInt()
  baths?: number;

  @IsOptional()
  @IsNumber()
  size?: number;

  @IsOptional()
  @IsNumber()
  marketRent?: number;

  @IsOptional()
  @IsNumber()
  deposit?: number;

  @IsOptional()
  @IsEnum(ParkingType)
  parking?: ParkingType;

  @IsOptional()
  @IsEnum(LaundryType)
  laundry?: LaundryType;

  @IsOptional()
  @IsEnum(ACType)
  ac?: ACType;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  feature?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  amenities?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  photos?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  attachments?: string[];
}
