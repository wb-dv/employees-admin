import { Injectable } from '@nestjs/common';
import { CreateJobTitleDto } from './dto/create-job-title.dto';
import { UpdateJobTitleDto } from './dto/update-job-title.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JobTitleEntity } from './entities/job-title.entity';

@Injectable()
export class JobTitlesService {
  constructor(private prisma: PrismaService) {}

  async create(createJobTitleDto: CreateJobTitleDto) {
    const jobTitle = await this.prisma.jobTitle.create({
      data: {
        ...createJobTitleDto,
        departamentId: createJobTitleDto.departamentId || null,
      },
    });

    return new JobTitleEntity(jobTitle);
  }

  async findAll() {
    const jobTitles = await this.prisma.jobTitle.findMany({
      orderBy: { id: 'asc' },
    });

    return jobTitles.map((jobTitle) => new JobTitleEntity(jobTitle));
  }

  async findOne(id: number) {
    const jobTitle = await this.prisma.jobTitle.findUnique({
      where: { id },
    });

    return jobTitle && new JobTitleEntity(jobTitle);
  }

  async update(updateJobTitleDto: UpdateJobTitleDto) {
    const jobTitle = await this.prisma.jobTitle.update({
      where: { id: updateJobTitleDto.id },
      data: updateJobTitleDto,
    });

    return new JobTitleEntity(jobTitle);
  }

  async remove(id: number) {
    try {
      const jobTitle = await this.prisma.jobTitle.delete({
        where: { id },
      });

      return new JobTitleEntity(jobTitle);
    } catch (error) {
      return null;
    }
  }
}
