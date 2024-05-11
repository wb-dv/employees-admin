import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { WorkersModule } from './workers/workers.module';
import { DepartmentsModule } from './departments/departments.module';

@Module({
  imports: [PrismaModule, WorkersModule, DepartmentsModule],
})
export class AppModule {}
