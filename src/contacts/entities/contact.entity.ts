import { Accounting } from 'src/accountings/entities/accounting.entity';
import { Listing } from 'src/listings/entities/listing.entity';
import { Maintenance } from 'src/maintenances/entities/maintenance.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('contacts')
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relations
  @OneToMany(() => Maintenance, (maintenance) => maintenance.tenant)
  maintenances: Maintenance[];

  @OneToMany(() => Accounting, (accounting) => accounting.tenant)
  accountings: Accounting[];

  @OneToMany(() => Listing, (listing) => listing.listedBy)
  listings: Listing[];
}
