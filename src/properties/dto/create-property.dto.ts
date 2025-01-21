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

export class CreatePropertyDto {
  @IsString()
  name: string;

  @IsInt()
  buildYear: number;

  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  stateOrRegion: string;

  @IsString()
  zip: string;

  @IsString()
  country: string;

  @IsEnum(PropertyType)
  type: PropertyType;

  @IsInt()
  beds: number;

  @IsInt()
  baths: number;

  @IsNumber()
  size: number;

  @IsNumber()
  marketRent: number;

  @IsNumber()
  deposit: number;

  @IsEnum(ParkingType)
  parking: ParkingType;

  @IsEnum(LaundryType)
  laundry: LaundryType;

  @IsEnum(ACType)
  ac: ACType;

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
