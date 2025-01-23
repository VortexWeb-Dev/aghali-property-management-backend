import { Contact } from 'src/contacts/entities/contact.entity';
import { Property } from 'src/properties/entities/property.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum TransactionType {
  RENT = 'Rent',
  SECURITY_DEPOSIT = 'Security Deposit',
  MAINTENANCE_CHARGE = 'Maintenance Charge',
  LATE_FEE = 'Late Fee',
  REFUND = 'Refund',
}
export enum PaymentStatus {
  PAID = 'Paid',
  PENDING = 'Pending',
  OVERDUE = 'Overdue',
  PARTIALLY_PAID = 'Partially Paid',
}
export enum PaymentMethod {
  BANK_TRANSFER = 'Bank Transfer',
  CASH = 'Cash',
  CREDIT_CARD = 'Credit Card',
  CHEQUE = 'Cheque',
}

@Entity('accountings')
export class Accounting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  transaction_type: string;

  @Column('decimal')
  amount: number;

  @Column('timestamp')
  transaction_date: Date;

  @Column('timestamp')
  due_date: Date;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
  })
  payment_status: string;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
  })
  payment_method: string;

  @Column({ nullable: true })
  invoice_number: string;

  @Column('text', { nullable: true })
  notes: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relations
  @ManyToOne(() => Property, (property) => property.accountings)
  property: Property;

  @ManyToOne(() => Contact, (contact) => contact.accountings)
  tenant: Contact;
}
