import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { PrismaModule } from 'src/prisma/prisma.module';

import { LocalStrategy } from './strategy/local';
import { JwtStrategy } from './strategy/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { WorkersModule } from 'src/workers/workers.module';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  imports: [
    WorkersModule,
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class AuthModule {}
