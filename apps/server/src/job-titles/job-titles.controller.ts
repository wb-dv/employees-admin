import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { JobTitlesService } from './job-titles.service';
import { CreateJobTitleDto } from './dto/create-job-title.dto';
import { UpdateJobTitleDto } from './dto/update-job-title.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JobTitleEntity } from './entities/job-title.entity';
import {
  DefaultApiBadRequestResponse,
  DefaultApiNotFoundResponse,
} from 'src/errors/default-errors.decorators';

@Controller('job-titles')
@ApiTags('Job titles')
export class JobTitlesController {
  constructor(private readonly jobTitlesService: JobTitlesService) {}

  @Post()
  @ApiCreatedResponse({ type: JobTitleEntity })
  @DefaultApiBadRequestResponse({ description: 'Не удалось создать должность' })
  create(@Body() createJobTitleDto: CreateJobTitleDto) {
    try {
      return this.jobTitlesService.create(createJobTitleDto);
    } catch (error) {
      throw new BadRequestException('Не удалось создать должность');
    }
  }

  @Get()
  @ApiOkResponse({ type: JobTitleEntity, isArray: true })
  @DefaultApiBadRequestResponse({
    description: 'Не удалось получить должности',
  })
  findAll() {
    try {
      return this.jobTitlesService.findAll();
    } catch (error) {
      throw new BadRequestException('Не удалось получить должности');
    }
  }

  @Get(':id')
  @ApiOkResponse({ type: JobTitleEntity })
  @DefaultApiBadRequestResponse({
    description: 'Не удалось получить должность',
  })
  @DefaultApiNotFoundResponse({ description: 'Должность не найдена' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    let jobTitle: JobTitleEntity | null;

    try {
      jobTitle = await this.jobTitlesService.findOne(id);
    } catch (error) {
      throw new BadRequestException('Не удалось получить должность');
    }

    if (jobTitle) return jobTitle;

    throw new NotFoundException('Должность не найдена');
  }

  @Patch()
  @ApiOkResponse({ type: JobTitleEntity })
  @DefaultApiBadRequestResponse({
    description: 'Не удалось обновить должность',
  })
  update(@Body() updateJobTitleDto: UpdateJobTitleDto) {
    try {
      return this.jobTitlesService.update(updateJobTitleDto);
    } catch (error) {
      throw new BadRequestException('Не удалось обновить должность');
    }
  }

  @Delete(':id')
  @ApiOkResponse({ type: JobTitleEntity })
  @DefaultApiBadRequestResponse({
    description: 'Не удалось удалить должность',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.jobTitlesService.remove(id);
    } catch (error) {
      throw new BadRequestException('Не удалось удалить должность');
    }
  }
}
