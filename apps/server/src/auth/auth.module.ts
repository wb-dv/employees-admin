import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [PrismaModule, PassportModule],
})
export class AuthModule {}
