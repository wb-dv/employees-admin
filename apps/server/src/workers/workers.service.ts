import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { WorkerResponseDto } from './dto/response-worker.dto';
import { GetWorkerDto } from './dto/get-worker.dto';

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

      return new WorkerResponseDto(newWorker);
    } catch (error) {
      throw new BadRequestException('Не удалось создать пользователя', {
        cause: error,
        description: error.message,
      });
    }
  }

  async findAll(query: GetWorkerDto) {
    query;
    const allWorkers = await this.prisma.worker.findMany({
      include: { jobTitle: true, groups: true },
    });

    return allWorkers.map((worker) => new WorkerResponseDto(worker));
  }

  async findOne(id: string) {
    try {
      const worker = await this.prisma.worker.findFirst({
        where: {
          id,
        },
        include: { jobTitle: true, groups: true },
      });

      return new WorkerResponseDto(worker);
    } catch (error) {
      throw new BadRequestException('Не удалось найти пользователя', {
        cause: error,
        description: error.message,
      });
    }
  }

  async update(id: string, updateWorkerDto: UpdateWorkerDto) {
    const worker = await this.prisma.worker.update({
      where: {
        id,
      },
      data: updateWorkerDto,
      include: { jobTitle: true, groups: true },
    });

    return new WorkerResponseDto(worker);
  }

  async remove(id: string) {
    const deletedWorker = await this.prisma.worker.delete({
      where: { id },
      include: { jobTitle: true, groups: true },
    });

    return new WorkerResponseDto(deletedWorker);
  }
}
