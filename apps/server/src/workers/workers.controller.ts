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
  NotFoundException,
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
import {
  DefaultApiBadRequestResponse,
  DefaultApiNotFoundResponse,
} from 'src/errors/default-errors.decorators';

@Controller('workers')
@ApiTags('Workers')
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}

  @Post()
  @ApiCreatedResponse({ type: WorkerResponseDto })
  @DefaultApiBadRequestResponse({
    description: 'Не удалось создать пользователя',
  })
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
  @DefaultApiBadRequestResponse({
    description: 'Не удалось найти работников',
  })
  findAll(@Body() query: GetWorkerDto) {
    try {
      return this.workersService.findAll(query);
    } catch (error) {
      throw new BadRequestException('Не удалось найти работников', {
        cause: error,
        description: error.message,
      });
    }
  }

  @Get(':id')
  @ApiOkResponse({ type: WorkerResponseDto })
  @DefaultApiNotFoundResponse({
    description: 'Работник не найден',
  })
  @DefaultApiBadRequestResponse({
    description: 'Не удалось найти работника',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    let worker: WorkerResponseDto | null;

    try {
      worker = await this.workersService.findOne(id);
    } catch (error) {
      throw new BadRequestException('Не удалось найти работника', {
        cause: error,
        description: error.message,
      });
    }

    if (worker) {
      return worker;
    }

    throw new NotFoundException('Работник не найден');
  }

  @Patch()
  @ApiOkResponse({ type: WorkerResponseDto })
  @DefaultApiBadRequestResponse({
    description: 'Не удалось обновить работника',
  })
  update(@Body() updateWorkerDto: UpdateWorkerDto) {
    try {
      return this.workersService.update(updateWorkerDto);
    } catch (error) {
      throw new BadRequestException('Не удалось обновить работника', {
        cause: error,
        description: error.message,
      });
    }
  }

  @Delete(':id')
  @ApiOkResponse({ type: WorkerResponseDto })
  @DefaultApiBadRequestResponse({
    description: 'Не удалось удалить работника',
  })
  @DefaultApiNotFoundResponse({
    description: 'Невозможно удалить работника, такого работника не существует',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    let worker: WorkerResponseDto | null;

    try {
      worker = await this.workersService.remove(id);
    } catch (error) {
      throw new BadRequestException('Не удалось удалить работника', {
        cause: error,
        description: error.message,
      });
    }

    if (worker) return worker;

    throw new NotFoundException(
      'Невозможно удалить работника, такого работника не существует',
    );
  }
}
