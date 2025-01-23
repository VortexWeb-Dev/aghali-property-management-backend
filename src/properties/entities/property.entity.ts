import { Accounting } from 'src/accountings/entities/accounting.entity';
import { Listing } from 'src/listings/entities/listing.entity';
import { Maintenance } from 'src/maintenances/entities/maintenance.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum PropertyType {
  SINGLE_UNIT = 'Single Unit',
  MULTIPLE_UNIT = 'Multiple Unit',
}

export enum ParkingType {
  COVERED = 'Covered',
  UNCOVERED = 'Uncovered',
  NONE = 'None',
}

export enum LaundryType {
  IN_UNIT = 'In-Unit',
  SHARED = 'Shared',
  NONE = 'None',
}

export enum ACType {
  CENTRAL = 'Central',
  WINDOW = 'Window',
  NONE = 'None',
}

@Entity('properties')
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'int' })
  buildYear: number;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  stateOrRegion: string;

  @Column()
  zip: string;

  @Column()
  country: string;

  @Column({
    type: 'enum',
    enum: PropertyType,
    default: PropertyType.SINGLE_UNIT,
  })
  type: PropertyType;

  @Column({ type: 'int', default: 0 })
  beds: number;

  @Column({ type: 'int', default: 0 })
  baths: number;

  @Column({ type: 'float' })
  size: number;

  @Column({ type: 'float' })
  marketRent: number;

  @Column({ type: 'float' })
  deposit: number;

  @Column({
    type: 'enum',
    enum: ParkingType,
    default: ParkingType.NONE,
  })
  parking: ParkingType;

  @Column({
    type: 'enum',
    enum: LaundryType,
    default: LaundryType.NONE,
  })
  laundry: LaundryType;

  @Column({
    type: 'enum',
    enum: ACType,
    default: ACType.NONE,
  })
  ac: ACType;

  @Column({ type: 'simple-array', nullable: true })
  feature: string[];

  @Column({ type: 'simple-array', nullable: true })
  amenities: string[];

  @Column({ type: 'simple-array', nullable: true })
  photos: string[];

  @Column({ type: 'simple-array', nullable: true })
  attachments: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relations
  @OneToMany(() => Maintenance, (maintenance) => maintenance.property)
  maintenances: Maintenance[];

  @OneToMany(() => Accounting, (accounting) => accounting.property)
  accountings: Accounting[];

  @OneToMany(() => Listing, (listing) => listing.property)
  listings: Listing[];
}
