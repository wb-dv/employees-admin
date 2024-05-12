import { Module } from '@nestjs/common';
import { JobTitlesService } from './job-titles.service';
import { JobTitlesController } from './job-titles.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [JobTitlesController],
  providers: [JobTitlesService],
  imports: [PrismaModule],
})
export class JobTitlesModule {}
