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
      url:process.env.DATABASE_URL,
      entities: [Job], // Register your entities here
      synchronize: true, // Auto-create tables (use with caution in production)
    }),
    JobModule, // Include your Job module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}