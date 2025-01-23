import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TransactionType, PaymentStatus, PaymentMethod } from '../entities/accounting.entity';
import { Property } from 'src/properties/entities/property.entity';
import { Contact } from 'src/contacts/entities/contact.entity';

export class CreateAccountingDto {
  @IsEnum(TransactionType)
  @IsNotEmpty()
  transaction_type: TransactionType;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  transaction_date: Date;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  due_date: Date;

  @IsEnum(PaymentStatus)
  @IsNotEmpty()
  payment_status: PaymentStatus;

  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  payment_method: PaymentMethod;

  @IsString()
  @IsOptional()
  invoice_number: string;

  @IsString()
  @IsOptional()
  notes: string;

  @IsNotEmpty()
  @Type(() => Property)
  property: Property;

  @IsNotEmpty()
  @Type(() => Contact)
  tenant: Contact;
}
