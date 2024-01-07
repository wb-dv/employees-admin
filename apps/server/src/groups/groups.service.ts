import { $Enums } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GroupsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.group.findMany({
      include: { workers: true, jobTitles: true },
    });
  }

  findOne(value: $Enums.GroupValue) {
    return this.prisma.group.findFirst({
      where: { value },
      include: { workers: true, jobTitles: true },
    });
  }
}
