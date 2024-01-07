import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WorkersService } from './workers.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { WorkerEntity } from './entities/worker.entity';

@Controller('workers')
@ApiTags('Workers')
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}

  @Post()
  @ApiCreatedResponse({ type: WorkerEntity })
  create(@Body() createWorkerDto: CreateWorkerDto) {
    return this.workersService.create(createWorkerDto);
  }

  @Get()
  @ApiOkResponse({ type: WorkerEntity, isArray: true })
  findAll() {
    return this.workersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: WorkerEntity })
  findOne(@Param('id') id: string) {
    return this.workersService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: WorkerEntity })
  update(@Param('id') id: string, @Body() updateWorkerDto: UpdateWorkerDto) {
    return this.workersService.update(id, updateWorkerDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: WorkerEntity })
  remove(@Param('id') id: string) {
    return this.workersService.remove(id);
  }
}
