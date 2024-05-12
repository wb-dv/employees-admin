import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import {
  DefaultApiBadRequestResponse,
  DefaultApiNotFoundResponse,
} from 'src/errors/default-errors.decorators';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentEntity } from './entities/department.entity';

@Controller('departments')
@ApiTags('Departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Get()
  @ApiOkResponse({ type: DepartmentEntity, isArray: true })
  @DefaultApiBadRequestResponse({
    description: 'Не удалось найти отделы',
  })
  findAll() {
    try {
      return this.departmentsService.findAll();
    } catch (error) {
      throw new BadRequestException('Не удалось найти отделы');
    }
  }

  @Get(':id')
  @ApiOkResponse({ type: DepartmentEntity })
  @DefaultApiBadRequestResponse({
    description: 'Не удалось найти отдел',
  })
  @DefaultApiBadRequestResponse({
    description: 'Отдел не найден',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    let department: DepartmentEntity | null;

    try {
      department = await this.departmentsService.findOne(id);
    } catch (error) {
      throw new BadRequestException('Не удалось найти отдел');
    }

    if (department) return department;

    throw new NotFoundException('Отдел не найден');
  }

  @Post()
  @ApiCreatedResponse({ type: DepartmentEntity })
  @DefaultApiBadRequestResponse({
    description: 'Не удалось создать отдел',
  })
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    try {
      return this.departmentsService.create(createDepartmentDto);
    } catch (error) {
      throw new BadRequestException('Не удалось создать отдел');
    }
  }

  @Patch()
  @ApiOkResponse({ type: DepartmentEntity })
  @DefaultApiBadRequestResponse({
    description: 'Не удалось обновить отдел',
  })
  update(@Body() updateDepartmentDto: UpdateDepartmentDto) {
    try {
      return this.departmentsService.update(updateDepartmentDto);
    } catch (error) {
      throw new BadRequestException('Не удалось обновить отдел');
    }
  }

  @Delete(':id')
  @ApiOkResponse({ type: DepartmentEntity })
  @DefaultApiBadRequestResponse({
    description: 'Не удалось удалить отдел',
  })
  @DefaultApiNotFoundResponse({
    description: 'Невозможно удалить отдел, такого отдела не существует',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    let department: DepartmentEntity | null;

    try {
      department = await this.departmentsService.remove(id);
    } catch (error) {
      throw new BadRequestException('Не удалось удалить отдел');
    }

    if (department) return department;

    throw new NotFoundException(
      'Невозможно удалить отдел, такого отдела не существует',
    );
  }
}
