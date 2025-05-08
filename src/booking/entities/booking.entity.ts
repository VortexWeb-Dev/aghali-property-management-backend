import { Property } from 'src/properties/entities/property.entity';
import { Contact } from 'src/contacts/entities/contact.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('booking')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  start_date: Date;

  @Column({ type: 'timestamp' })
  end_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relations
  @ManyToOne(() => Property, (property) => property.bookings)
  property: Property;

  @ManyToOne(() => Contact, (contact) => contact.bookings)
  tenant: Contact;
}
