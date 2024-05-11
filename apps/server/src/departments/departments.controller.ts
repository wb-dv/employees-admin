import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { DepartmentsService } from './departments.service';
import { DepartmentDto } from './dto/department.dto';
import { CreateDepartmentDto } from './dto/create-department.dto';

@Controller('departments')
@ApiTags('Departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Get()
  @ApiOkResponse({ type: DepartmentDto, isArray: true })
  findAll() {
    return this.departmentsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: DepartmentDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.departmentsService.findOne(id);
  }

  @Post()
  @ApiOkResponse({ type: DepartmentDto })
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(createDepartmentDto);
  }

  @Patch()
  @ApiOkResponse({ type: DepartmentDto })
  update(@Body() updateDepartmentDto: DepartmentDto) {
    return this.departmentsService.update(updateDepartmentDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: DepartmentDto })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.departmentsService.remove(id);
  }
}
