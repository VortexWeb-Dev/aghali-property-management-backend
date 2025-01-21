// create-contact.dto.ts
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateContactDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  avatar?: string;
}
