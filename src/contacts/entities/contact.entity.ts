import { Accounting } from 'src/accountings/entities/accounting.entity';
import { Maintenance } from 'src/maintenances/entities/maintenance.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

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

  // Relations
  @OneToMany(() => Maintenance, (maintenance) => maintenance.tenant)
  maintenances: Maintenance[];

  @OneToMany(() => Accounting, (accounting) => accounting.tenant)
  accountings: Accounting[];
}
