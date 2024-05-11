import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DepartmentResponseDto } from './dto/response-departments.dto';

@Injectable()
export class DepartmentsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const departments = await this.prisma.departament.findMany({
      include: { workers: true, jobTitles: true },
    });

    return departments.map(
      (department) =>
        new DepartmentResponseDto({
          department,
          workers: department.workers,
          jobTitles: department.jobTitles,
        }),
    );
  }

  async findOne(id: number) {
    const department = await this.prisma.departament.findFirst({
      where: { id },
      include: { workers: true, jobTitles: true },
    });

    return new DepartmentResponseDto({
      department,
      workers: department.workers,
      jobTitles: department.jobTitles,
    });
  }
}
