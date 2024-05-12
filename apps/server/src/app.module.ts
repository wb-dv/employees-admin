import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { WorkersModule } from './workers/workers.module';
import { DepartmentsModule } from './departments/departments.module';
import { JobTitlesModule } from './job-titles/job-titles.module';

@Module({
  imports: [PrismaModule, WorkersModule, DepartmentsModule, JobTitlesModule],
})
export class AppModule {}
