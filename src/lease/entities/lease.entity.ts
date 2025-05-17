import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Property } from 'src/properties/entities/property.entity';
import { Contact } from 'src/contacts/entities/contact.entity';

@Entity('leases')
export class Lease {
  @PrimaryGeneratedColumn()
  id: number;

  // Lease Details
  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date' })
  end_date: Date;

  @Column({ type: 'int', default: 12 })
  duration_in_months: number;

  @Column({ type: 'varchar', default: 'Active' })
  status: 'Active' | 'Expired' | 'Terminated' | 'Upcoming';

  @Column({ type: 'boolean', default: false })
  renewal_option: boolean;

  // Financials
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  monthly_rent: number;

  @Column({ type: 'varchar', default: 'Monthly' })
  payment_frequency: 'Monthly' | 'Quarterly' | 'Annually';

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  security_deposit: number;

  @Column({ type: 'date', nullable: true })
  last_payment_date: Date;

  @Column({ type: 'date', nullable: true })
  next_due_date: Date;

  // Optional File Reference
  @Column({ type: 'varchar', nullable: true })
  lease_agreement: string;

  // Notes
  @Column({ type: 'text', nullable: true })
  notes: string;

  // Relations
  @ManyToOne(() => Property, { nullable: false, eager: true })
  @JoinColumn({ name: 'property_id' })
  property: Property;

  @ManyToOne(() => Contact, { nullable: false, eager: true })
  @JoinColumn({ name: 'tenant_id' })
  tenant: Contact;

  // Timestamps
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
