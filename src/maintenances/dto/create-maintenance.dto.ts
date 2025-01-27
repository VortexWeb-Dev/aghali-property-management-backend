import { IsEnum, IsNotEmpty, IsString, IsDate } from 'class-validator';
import {
  RequestType,
  Category,
  SubCategory,
  Issue,
  SubIssue,
  Stage, 
  Status
} from '../entities/maintenance.entity';

export class CreateMaintenanceDto {
  @IsEnum(RequestType)
  request_type: RequestType;

  @IsEnum(Category)
  category: Category;

  @IsEnum(SubCategory)
  sub_category: SubCategory;

  @IsEnum(Issue)
  issue: Issue;

  @IsEnum(SubIssue)
  sub_issue: SubIssue;

  @IsEnum(Stage)
  stage: Stage;

  @IsEnum(Status)
  status: Status;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  details: string;

  @IsNotEmpty()
  propertyId: number;

  @IsNotEmpty()
  tenantId: number;

  @IsNotEmpty()
  @IsDate()
  available_datetime: Date;
}
