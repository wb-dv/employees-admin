import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { DepartmentsService } from './departments.service';
import { DepartmentResponseDto } from './dto/response-departments.dto';

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
}
