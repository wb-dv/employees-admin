import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';

import { PrismaService } from 'src/prisma/prisma.service';

import { AccountEntity } from 'src/workers/entities/account.entity';
import { WorkersService } from 'src/workers/workers.service';

import { hashPassword } from 'src/shared/password';

import { RegisterExistedDto } from './dto/register-existed.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly workersService: WorkersService,
  ) {}

  readonly TOKEN_KEY = 'access_token';

  async getAccount(email: string) {
    return this.prisma.account.findFirst({
      where: { email },
      include: { worker: { include: { jobTitle: true, departament: true } } },
    });
  }

  async validateAccount(email: string, password: string) {
    const account = await this.getAccount(email);

    if (account && compareSync(password, account.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = account;

      return result;
    }

    return null;
  }

  async signToken(account: Omit<AccountEntity, 'worker'>) {
    const payload = {
      email: account.email,
      sub: account.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async registerNewAccount(registerDto: RegisterDto) {
    try {
      const newWorker = await this.workersService.create(registerDto);

      const { access_token } = await this.signToken(newWorker.account);

      return { access_token };
    } catch (error) {
      throw new Error();
    }
  }

  async registerExistedAccount(registerDto: RegisterExistedDto) {
    try {
      const updatedAccount = await this.prisma.account.update({
        where: { email: registerDto.email },
        data: {
          password: hashPassword(registerDto.password),
        },
      });

      const { access_token } = await this.signToken(updatedAccount);

      return { access_token };
    } catch (error) {
      throw new Error();
    }
  }
}
