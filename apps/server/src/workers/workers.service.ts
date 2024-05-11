import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { WorkerResponseDto } from './dto/response-worker.dto';
import { GetWorkerDto } from './dto/get-worker.dto';

@Injectable()
export class WorkersService {
  constructor(private prisma: PrismaService) {}

  async create(createWorkerDto: CreateWorkerDto) {
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
  }

  async findAll(query: GetWorkerDto) {
    const skip: number | undefined =
      query.paging && (query.paging.page - 1) * query.paging.size;
    const take: number | undefined = query.paging && query.paging.size;

    const allWorkers = await this.prisma.worker.findMany({
      skip,
      take,
      include: { jobTitle: true, departament: true, account: true },
      where: query.search,
      orderBy: { [query.orderedBy || 'id']: query.direction || 'asc' },
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

  async findOne(id: number) {
    const worker = await this.prisma.worker.findFirst({
      where: {
        id,
      },
      include: { jobTitle: true, departament: true, account: true },
    });

    return new WorkerResponseDto({
      worker: worker,
      account: worker.account,
      departament: worker.departament,
      jobTitle: worker.jobTitle,
    });
  }

  async update(updateWorkerDto: UpdateWorkerDto) {
    const worker = await this.prisma.worker.update({
      where: {
        id: updateWorkerDto.id,
      },
      data: updateWorkerDto,
      include: { jobTitle: true, departament: true, account: true },
    });

    return new WorkerResponseDto({
      worker: worker,
      account: worker.account,
      departament: worker.departament,
      jobTitle: worker.jobTitle,
    });
  }

  async remove(id: number) {
    const deletedWorker = await this.prisma.worker.delete({
      where: { id },
      include: { jobTitle: true, departament: true, account: true },
    });

    return new WorkerResponseDto({
      worker: deletedWorker,
      account: deletedWorker.account,
      departament: deletedWorker.departament,
      jobTitle: deletedWorker.jobTitle,
    });
  }
}
