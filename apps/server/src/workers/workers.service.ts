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
      const newWorker = await this.prisma.worker.create({
        data: {
          firstname: createWorkerDto.firstname,
          lastname: createWorkerDto.lastname,
          patronymic: createWorkerDto.patronymic,
          phone: createWorkerDto.phone,
          dateOfBirth: createWorkerDto.dateOfBirth,

          departament: {
            connect: {
              id: createWorkerDto.departamentId,
            },
          },

          jobTitle: {
            connect: {
              id: createWorkerDto.jobTitleId,
            },
          },

          account: {
            create: {
              email: createWorkerDto.email,
              role: createWorkerDto.role,
              password: createWorkerDto.password,
            },
          },
        },
        include: {
          jobTitle: true,
          departament: true,
          account: true,
        },
      });

      return new WorkerResponseDto({
        worker: newWorker,
        account: newWorker.account,
        departament: newWorker.departament,
        jobTitle: newWorker.jobTitle,
      });
    } catch (error) {
      throw new BadRequestException('Не удалось создать пользователя', {
        cause: error,
        description: error.message,
      });
    }
  }

  async findAll(query: GetWorkerDto) {
    const allWorkers = await this.prisma.worker.findMany({
      include: { jobTitle: true, departament: true, account: true },
      orderBy: { [query.orderedBy]: query.direction },
    });

    return allWorkers.map(
      (worker) =>
        new WorkerResponseDto({
          worker: worker,
          account: worker.account,
          departament: worker.departament,
          jobTitle: worker.jobTitle,
        }),
    );
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
