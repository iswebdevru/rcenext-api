import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectService {
  constructor(private prisma: PrismaService) {}

  async create(createSubjectDto: CreateSubjectDto) {
    return this.prisma.subject.create({
      data: createSubjectDto,
      include: {
        teachers: {
          select: { teacher: true },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.subject.findMany({
      include: {
        teachers: {
          select: { teacher: true },
        },
      },
    });
  }

  async findOne(id: number) {
    const subject = await this.prisma.subject.findUnique({
      where: { id },
      include: {
        teachers: {
          select: { teacher: true },
        },
      },
    });
    if (!subject) {
      throw new NotFoundException(`Subject with id=${id} doesn't exist`);
    }
    return subject;
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    try {
      return await this.prisma.subject.update({
        where: { id },
        data: updateSubjectDto,
      });
    } catch {
      throw new NotFoundException(`Subject with id=${id} doesn't exist`);
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.subject.delete({ where: { id } });
      return `Subject with id=${id} has been removed`;
    } catch {
      throw new NotFoundException(`Subject with id=${id} doesn't exist`);
    }
  }
}
