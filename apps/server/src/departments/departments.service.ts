import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DepartmentDto } from './dto/department.dto';
import { CreateDepartmentDto } from './dto/create-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const departments = await this.prisma.departament.findMany({});

    return departments.map((department) => new DepartmentDto(department));
  }

  async findOne(id: number) {
    const department = await this.prisma.departament.findFirst({
      where: { id },
    });

    return new DepartmentDto(department);
  }

  async create(createDepartmentDto: CreateDepartmentDto) {
    const department = await this.prisma.departament.create({
      data: createDepartmentDto,
    });

    return new DepartmentDto(department);
  }

  async update(updateDepartmentDto: DepartmentDto) {
    const department = await this.prisma.departament.update({
      where: { id: updateDepartmentDto.id },
      data: updateDepartmentDto,
    });

    return new DepartmentDto(department);
  }

  async remove(id: number) {
    const department = await this.prisma.departament.delete({
      where: { id },
    });

    return new DepartmentDto(department);
  }
}
