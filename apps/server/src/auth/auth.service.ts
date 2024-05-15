import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from 'src/prisma/prisma.service';
import { AccountEntity } from 'src/workers/entities/account.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
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

  async login(account: AccountEntity) {
    const payload = {
      email: account.email,
      sub: account.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
