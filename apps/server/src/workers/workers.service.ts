import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WorkersService {
  constructor(private prisma: PrismaService) {}

  async create(createWorkerDto: CreateWorkerDto) {
    try {
      const jobTitle = await this.prisma.jobTitle.findFirst({
        where: {
          value: createWorkerDto.jobTitleId,
        },
        include: {
          groups: true,
        },
      });

      const newWorker = await this.prisma.worker.create({
        data: {
          email: createWorkerDto.email,
          name: createWorkerDto.name,
          password: createWorkerDto.password,
          phone: createWorkerDto.phone,
          image: createWorkerDto.image,
          role: createWorkerDto.role,
          groups: {
            connect: jobTitle.groups,
          },
          jobTitle: {
            connect: {
              value: jobTitle.value,
            },
          },
        },
        include: {
          jobTitle: true,
          groups: true,
        },
      });

      return newWorker;
    } catch (error) {
      throw new BadRequestException('Не удалось создать пользователя', {
        cause: error,
        description: error.message,
      });
    }
  }

  findAll() {
    return this.prisma.worker.findMany();
  }

  findOne(id: string) {
    try {
      return this.prisma.worker.findFirst({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new BadRequestException('Не удалось найти пользователя', {
        cause: error,
        description: error.message,
      });
    }
  }

  update(id: string, updateWorkerDto: UpdateWorkerDto) {
    return this.prisma.worker.update({
      where: {
        id,
      },
      data: updateWorkerDto,
    });
  }

  remove(id: string) {
    return this.prisma.worker.delete({ where: { id } });
  }
}
