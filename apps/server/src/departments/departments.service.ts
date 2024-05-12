import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentEntity } from './entities/department.entity';

@Injectable()
export class DepartmentsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const departments = await this.prisma.departament.findMany({
      orderBy: { id: 'asc' },
      include: { jobTitles: true },
    });

    return departments.map(
      (department) =>
        new DepartmentEntity({ department, jobTitles: department.jobTitles }),
    );
  }

  async findOne(id: number) {
    const department = await this.prisma.departament.findFirst({
      where: { id },
      include: { jobTitles: true },
    });

    return new DepartmentEntity({
      department,
      jobTitles: department.jobTitles,
    });
  }

  async create(createDepartmentDto: CreateDepartmentDto) {
    const department = await this.prisma.departament.create({
      data: {
        ...createDepartmentDto,
        jobTitles: createDepartmentDto.jobTitles && {
          connect: createDepartmentDto.jobTitles?.map((id) => ({ id })),
        },
      },
      include: { jobTitles: true },
    });

    return new DepartmentEntity({
      department,
      jobTitles: department.jobTitles,
    });
  }

  async update(updateDepartmentDto: UpdateDepartmentDto) {
    const department = await this.prisma.departament.update({
      where: { id: updateDepartmentDto.id },
      data: {
        ...updateDepartmentDto,
        jobTitles: updateDepartmentDto.jobTitles && {
          connect: updateDepartmentDto.jobTitles?.map((id) => ({ id })),
        },
      },
      include: { jobTitles: true },
    });

    return new DepartmentEntity({
      department,
      jobTitles: department.jobTitles,
    });
  }

  async remove(id: number) {
    try {
      const department = await this.prisma.departament.delete({
        where: { id },
        include: { jobTitles: true },
      });

      return new DepartmentEntity({
        department,
        jobTitles: department.jobTitles,
      });
    } catch (error) {
      return null;
    }
  }
}
