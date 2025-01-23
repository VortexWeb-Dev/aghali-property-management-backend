import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Property } from 'src/properties/entities/property.entity';
import { Contact } from 'src/contacts/entities/contact.entity';

export enum ListingType {
  SALE = 'Sale',
  RENT = 'Rent',
  LEASE = 'Lease',
}

export enum ListingStatus {
  ACTIVE = 'Active',
  PENDING = 'Pending',
  SOLD = 'Sold',
  LEASED = 'Leased',
  EXPIRED = 'Expired',
}

@Entity('listings')
export class Listing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ListingType,
    default: ListingType.RENT,
  })
  listingType: ListingType;

  @Column({
    type: 'enum',
    enum: ListingStatus,
    default: ListingStatus.ACTIVE,
  })
  listingStatus: ListingStatus;

  @Column('date', { nullable: true })
  availableFrom: Date;

  @Column('date')
  listingDate: Date;

  @Column('date', { nullable: true })
  expiryDate: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;

  // Relations
  @ManyToOne(() => Property, (property) => property.listings, {
    eager: true,
    nullable: false,
  })
  property: Property;

  @ManyToOne(() => Contact, (contact) => contact.listings, {
    eager: true,
    nullable: false,
  })
  listedBy: Contact;
}
