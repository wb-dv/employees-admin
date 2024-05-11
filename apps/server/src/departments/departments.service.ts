import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DepartmentResponseDto } from './dto/response-departments.dto';
import { CreateDepartmentDto } from './dto/create-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const departments = await this.prisma.departament.findMany({});

    return departments.map(
      (department) => new DepartmentResponseDto(department),
    );
  }

  async findOne(id: number) {
    const department = await this.prisma.departament.findFirst({
      where: { id },
    });

    return new DepartmentResponseDto(department);
  }

  async create(createDepartmentDto: CreateDepartmentDto) {
    const department = await this.prisma.departament.create({
      data: createDepartmentDto,
    });

    return new DepartmentResponseDto(department);
  }
}
