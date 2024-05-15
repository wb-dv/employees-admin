import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { WorkersModule } from './workers/workers.module';
import { DepartmentsModule } from './departments/departments.module';
import { JobTitlesModule } from './job-titles/job-titles.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    WorkersModule,
    DepartmentsModule,
    JobTitlesModule,
    AuthModule,
  ],
})
export class AppModule {}
