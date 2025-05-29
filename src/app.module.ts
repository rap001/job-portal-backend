import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobModule } from './job/job.module'; // We'll create this later
import { Job } from './job/entities/job.entity'; // We'll create this later

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres', // or your PostgreSQL host
      port: 5432,
      username: 'admin', // your PostgreSQL username
      password: 'admin', // your PostgreSQL password
      database: 'job_portal', // the database you created
      entities: [Job], // Register your entities here
      synchronize: true, // Auto-create tables (use with caution in production)
    }),
    JobModule, // Include your Job module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}