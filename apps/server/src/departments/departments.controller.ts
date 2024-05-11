import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { DepartmentsService } from './departments.service';
import { DepartmentResponseDto } from './dto/response-departments.dto';
import { CreateDepartmentDto } from './dto/create-department.dto';

@Controller('departments')
@ApiTags('Departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Get()
  @ApiOkResponse({ type: DepartmentResponseDto, isArray: true })
  findAll() {
    return this.departmentsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: DepartmentResponseDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.departmentsService.findOne(id);
  }

  @Post()
  @ApiOkResponse({ type: DepartmentResponseDto })
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(createDepartmentDto);
  }
}
