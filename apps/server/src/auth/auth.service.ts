import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async validateAccount(email: string, password: string) {
    const account = await this.prisma.account.findFirst({
      where: { email },
      include: { worker: true },
    });

    if (account && compareSync(password, account.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = account;

      return result;
    }

    return null;
  }
}
