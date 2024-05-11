import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
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
    return this.workersService.create(createWorkerDto);
  }

  @Post('/read')
  @ApiBody({ required: false, type: GetWorkerDto })
  @ApiOkResponse({ type: WorkerResponseDto, isArray: true })
  findAll(@Body() query: GetWorkerDto) {
    return this.workersService.findAll(query);
  }

  @Get(':id')
  @ApiOkResponse({ type: WorkerResponseDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.workersService.findOne(id);
  }

  @Patch()
  @ApiOkResponse({ type: WorkerResponseDto })
  update(@Body() updateWorkerDto: UpdateWorkerDto) {
    return this.workersService.update(updateWorkerDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: WorkerResponseDto })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.workersService.remove(id);
  }
}
