import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Job {
  @PrimaryGeneratedColumn('uuid') // Use UUID for job IDs
  id: string;

  @Column()
  title: string;

  @Column()
  jobType: string; // e.g., 'Full-time', 'Part-time', 'Contract'

  @Column()
  location: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 5, scale: 2 }) // Salary in LPA (e.g., 12.50)
  salary: number;

  @Column()
  experience: string; // e.g., '0-2 years', '3-5 years', '5+ years'

  @Column({ default: true })
  isActive: boolean; // To mark jobs as active/inactive

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}