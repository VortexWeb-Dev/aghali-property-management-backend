import { Contact } from 'src/contacts/entities/contact.entity';
import { Property } from 'src/properties/entities/property.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum RequestType {
  BASIC = 'Basic',
  ADVANCED = 'Advanced',
}

export enum Category {
  APPLIANCES = 'Appliances',
  ELECTRICAL = 'Electrical',
  HOUSE_EXTERIOR = 'House Exterior',
  HOUSEHOLD = 'Household',
  OUTDOORS = 'Outdoors',
  PLUMBING = 'Plumbing',
}

export enum SubCategory {
  // Appliances
  STOVE = 'Stove',
  DISHWASHER = 'Dishwasher',
  FRIDGE = 'Fridge',
  HEATING_COOLING = 'Heating & Cooling',

  // Electrical
  LIGHTS = 'Lights',
  OUTLETS = 'Outlets',
  BREAKERS = 'Breakers',
  TELEPHONE_SYSTEMS = 'Telephone Systems',

  // House Exterior
  ROOF = 'Roof',
  DOORS = 'Doors',
  WINDOWS = 'Windows',
  AIR_CONDITIONING = 'Air Conditioning',

  // Household
  CLOSETS = 'Closets',
  FLOORING = 'Flooring',
  PEST_CONTROL = 'Pest Control',

  // Outdoors
  LANDSCAPING = 'Landscaping',
  FENCING = 'Fencing',
  POOL = 'Pool',
  PORCH = 'Porch',
  PARKING = 'Parking',

  // Plumbing
  DRAINS = 'Drains',
  FAUCETS = 'Faucets',
  PIPES = 'Pipes',
  PUMPS = 'Pumps',
  SPRINKLER_SYSTEMS = 'Sprinkler Systems',
}

export enum Issue {
  // General Issues based on categories
  APPLIANCE_FAILURE = 'Appliance Failure',
  ELECTRICAL_OUTAGE = 'Electrical Outage',
  ROOF_LEAK = 'Roof Leak',
  WINDOW_DAMAGE = 'Window Damage',
  LANDSCAPING_ISSUE = 'Landscaping Issue',
  PLUMBING_LEAK = 'Plumbing Leak',
  OTHER = 'Other',
}

export enum SubIssue {
  // Specific issues based on sub-categories
  STOVE_NOT_WORKING = 'Stove Not Working',
  LIGHTS_FLICKERING = 'Lights Flickering',
  BROKEN_DOOR = 'Broken Door',
  POOL_MAINTENANCE = 'Pool Maintenance',
  CLOGGED_DRAIN = 'Clogged Drain',
  OTHER = 'Other'
}

export enum Stage {
  NEW = 'New',
  UPDATED = 'Updated',
  PENDING = 'Pending',
}

export enum Status {
  NORMAL = 'Normal',
  MODERATE = 'Moderate',
  CRITICAL = 'Critical',
}

@Entity('maintenance')
export class Maintenance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: RequestType })
  request_type: RequestType;

  @Column({ type: 'enum', enum: Category })
  category: Category;

  @Column({ type: 'enum', enum: SubCategory })
  sub_category: SubCategory;

  @Column({ type: 'enum', enum: Issue })
  issue: Issue;

  @Column({ type: 'enum', enum: SubIssue })
  sub_issue: SubIssue;

  @Column({ type: 'enum', enum: Stage })
  stage: Stage;

  @Column({ type: 'enum', enum: Status })
  status: Status;

  @Column()
  title: string;

  @Column('text')
  details: string;

  @Column({ type: 'timestamp' })
  available_datetime: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relations
  @ManyToOne(() => Property, (property) => property.maintenances)
  property: Property;

  @ManyToOne(() => Contact, (contact) => contact.maintenances)
  tenant: Contact;
}
