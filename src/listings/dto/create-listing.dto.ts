import {
  IsString,
  IsEnum,
  IsDateString,
  IsOptional,
  IsInt,
} from 'class-validator';
import { ListingType, ListingStatus } from '../entities/listing.entity';

export class CreateListingDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(ListingType)
  listingType: ListingType;

  @IsEnum(ListingStatus)
  listingStatus: ListingStatus;

  @IsDateString()
  @IsOptional()
  availableFrom?: Date;

  @IsDateString()
  listingDate: Date;

  @IsDateString()
  @IsOptional()
  expiryDate?: Date;

  @IsInt()
  propertyId: number;

  @IsInt()
  listedById: number;
}
