import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { $Enums } from '@prisma/client';

import { GroupsService } from './groups.service';
import { GroupResponseDto } from './dto/response-group.dto';

@Controller('groups')
@ApiTags('Groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  @ApiOkResponse({ type: GroupResponseDto, isArray: true })
  findAll() {
    return this.groupsService.findAll();
  }

  @Get(':value')
  @ApiOkResponse({ type: GroupResponseDto })
  findOne(@Param('value') value: $Enums.GroupValue) {
    return this.groupsService.findOne(value);
  }
}
