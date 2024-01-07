import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { WorkersModule } from './workers/workers.module';
import { GroupsModule } from './groups/groups.module';

@Module({
  imports: [PrismaModule, WorkersModule, GroupsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
