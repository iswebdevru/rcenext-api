import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeacherService {
  constructor(private prisma: PrismaService) {}

  async create(createTeacherDto: CreateTeacherDto) {
    return this.prisma.teacher.create({ data: createTeacherDto });
  }

  async findAll() {
    return this.prisma.teacher.findMany();
  }

  async findOne(id: number) {
    const teacher = await this.prisma.teacher.findUnique({ where: { id } });
    if (!teacher) {
      throw new NotFoundException(`Teacher with id=${id} doesn't exist`);
    }
    return teacher;
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    try {
      return await this.prisma.teacher.update({
        where: { id },
        data: updateTeacherDto,
      });
    } catch {
      throw new NotFoundException(`Teacher with id=${id} doesn't exist`);
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.teacher.delete({ where: { id }, select: null });
      return `Teacher with id=${id} has been removed`;
    } catch {
      throw new NotFoundException(`Teacher with id=${id} doesn't exist`);
    }
  }
}
