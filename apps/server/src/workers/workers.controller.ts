import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { WorkersService } from './workers.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { WorkerResponseDto } from './dto/response-worker.dto';
import { GetWorkerDto } from './dto/get-worker.dto';

@Controller('workers')
@ApiTags('Workers')
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}

  @Post()
  @ApiCreatedResponse({ type: WorkerResponseDto })
  create(@Body() createWorkerDto: CreateWorkerDto) {
    try {
      return this.workersService.create(createWorkerDto);
    } catch (error) {
      throw new BadRequestException('Не удалось создать пользователя', {
        cause: error,
        description: error.message,
      });
    }
  }

  @Post('/read')
  @ApiBody({ required: false, type: GetWorkerDto })
  @ApiOkResponse({ type: WorkerResponseDto, isArray: true })
  findAll(@Body() query: GetWorkerDto) {
    try {
      return this.workersService.findAll(query);
    } catch (error) {
      throw new BadRequestException('Не удалось найти пользователей', {
        cause: error,
        description: error.message,
      });
    }
  }

  @Get(':id')
  @ApiOkResponse({ type: WorkerResponseDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.workersService.findOne(id);
    } catch (error) {
      throw new BadRequestException('Не удалось найти пользователя', {
        cause: error,
        description: error.message,
      });
    }
  }

  @Patch()
  @ApiOkResponse({ type: WorkerResponseDto })
  update(@Body() updateWorkerDto: UpdateWorkerDto) {
    try {
      return this.workersService.update(updateWorkerDto);
    } catch (error) {
      throw new BadRequestException('Не удалось обновить пользователя', {
        cause: error,
        description: error.message,
      });
    }
  }

  @Delete(':id')
  @ApiOkResponse({ type: WorkerResponseDto })
  remove(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.workersService.remove(id);
    } catch (error) {
      throw new BadRequestException('Не удалось удалить пользователя', {
        cause: error,
        description: error.message,
      });
    }
  }
}
