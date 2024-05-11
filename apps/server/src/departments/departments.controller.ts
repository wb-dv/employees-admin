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
import { DepartmentDto } from './dto/department.dto';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { DefaultApiBadRequestResponse } from 'src/errors/default-errors.decorators';

@Controller('departments')
@ApiTags('Departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Get()
  @ApiOkResponse({ type: DepartmentDto, isArray: true })
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
  @ApiOkResponse({ type: DepartmentDto })
  @DefaultApiBadRequestResponse({
    description: 'Не удалось найти отдел',
  })
  @DefaultApiBadRequestResponse({
    description: 'Отдел не найден',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    let department: DepartmentDto | null;

    try {
      department = await this.departmentsService.findOne(id);
    } catch (error) {
      throw new BadRequestException('Не удалось найти отдел');
    }

    if (department) return department;

    throw new NotFoundException('Отдел не найден');
  }

  @Post()
  @ApiCreatedResponse({ type: DepartmentDto })
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
  @ApiOkResponse({ type: DepartmentDto })
  @DefaultApiBadRequestResponse({
    description: 'Не удалось обновить отдел',
  })
  update(@Body() updateDepartmentDto: DepartmentDto) {
    try {
      return this.departmentsService.update(updateDepartmentDto);
    } catch (error) {
      throw new BadRequestException('Не удалось обновить отдел');
    }
  }

  @Delete(':id')
  @ApiOkResponse({ type: DepartmentDto })
  @DefaultApiBadRequestResponse({
    description: 'Не удалось удалить отдел',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.departmentsService.remove(id);
    } catch (error) {
      throw new BadRequestException('Не удалось удалить отдел');
    }
  }
}
