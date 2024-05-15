import { Module } from '@nestjs/common';
import { WorkersService } from './workers.service';
import { WorkersController } from './workers.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [WorkersController],
  providers: [WorkersService],
  imports: [PrismaModule],
  exports: [WorkersService],
})
export class WorkersModule {}
