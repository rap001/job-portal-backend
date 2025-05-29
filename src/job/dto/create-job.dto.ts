import { IsString, IsNumber, IsNotEmpty, IsBoolean, IsOptional, Min, Max } from 'class-validator';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  jobType: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(100) // Assuming salary is reasonable, e.g., up to 100 LPA
  salary: number;

  @IsString()
  @IsNotEmpty()
  experience: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}