import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Transaction } from 'typeorm';
import { Job } from './entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto'; // We'll create this DTO
import { UpdateJobDto } from './dto/update-job.dto'; // We'll create this DTO
import { FilterJobsDto } from './dto/filter-jobs.dto'; // We'll create this DTO

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
  ) {}
  async create(createJobDto: CreateJobDto): Promise<Job> {
    const job = this.jobRepository.create(createJobDto);
    return this.jobRepository.save(job);
  }

  async findAll(filterDto: FilterJobsDto): Promise<Job[]> {
    const { title, jobType, location, minSalary, maxSalary, experience } = filterDto;
    const queryBuilder = this.jobRepository.createQueryBuilder('job');

    if (title) {
      queryBuilder.andWhere('job.title ILIKE :title', { title: `%${title}%` });
    }
    if (jobType) {
      queryBuilder.andWhere('job.jobType = :jobType', { jobType });
    }
    if (location) {
      queryBuilder.andWhere('job.location ILIKE :location', { location: `%${location}%` });
    }
    if (minSalary) {
      queryBuilder.andWhere('job.salary >= :minSalary', { minSalary });
    }
    if (maxSalary) {
      queryBuilder.andWhere('job.salary <= :maxSalary', { maxSalary });
    }
    if (experience) {
      queryBuilder.andWhere('job.experience = :experience', { experience });
    }

    return queryBuilder.getMany();
  }

  async findOne(id: string): Promise<Job> {
    const job = await this.jobRepository.findOne({ where: { id } });
    if (!job) {
      throw new NotFoundException(`Job with ID "${id}" not found`);
    }
    return job;
  }

  async update(id: string, updateJobDto: UpdateJobDto): Promise<Job> {
    const job = await this.findOne(id); // Use findOne to check existence
    Object.assign(job, updateJobDto);
    return this.jobRepository.save(job);
  }

  async remove(id: string): Promise<void> {
    const result = await this.jobRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Job with ID "${id}" not found`);
    }
  }
}