import { IsOptional, IsString, IsNumber, IsIn, IsDecimal } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterJobsDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  jobType?: string; // Consider using @IsIn for predefined job types

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minSalary?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxSalary?: number;

  @IsOptional()
  @IsString()
  experience?: string; // Consider using @IsIn for predefined experience levels
}