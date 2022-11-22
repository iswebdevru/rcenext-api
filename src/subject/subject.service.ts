import { Injectable, NotFoundException } from '@nestjs/common';
import { pluck } from 'rambda';
import { PrismaService } from 'src/prisma/prisma.service';
import { Utils } from 'src/utils/utils';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectService {
  constructor(private prisma: PrismaService, private utils: Utils) {}

  async create({ name, teachers }: CreateSubjectDto) {
    const subject = await this.prisma.subject.create({
      data: { name: name },
    });
    const availableTeachers = await this.prisma.teacher.count({
      where: { id: { in: teachers } },
    });
    if (teachers && availableTeachers === teachers.length) {
      await this.prisma.subjectCrossTeacher.createMany({
        data: teachers.map(teacherId => ({
          teacherId,
          subjectId: subject.id,
        })),
      });
    }
    return this.prisma.subject.findUnique({
      where: { id: subject.id },
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
      orderBy: {
        createdAt: 'desc',
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

  async update(subjectId: number, { name, teachers }: UpdateSubjectDto) {
    try {
      if (teachers) {
        const [removedTeachers, addedTeachers] = this.utils.distributeItems(
          pluck(
            'teacherId',
            await this.prisma.subjectCrossTeacher.findMany({
              where: { subjectId: subjectId },
              select: { teacherId: true },
            })
          ),
          teachers
        );
        await Promise.all([
          this.prisma.subjectCrossTeacher.deleteMany({
            where: { subjectId, teacherId: { in: removedTeachers } },
          }),
          this.prisma.subjectCrossTeacher.createMany({
            data: addedTeachers.map(teacherId => ({ subjectId, teacherId })),
          }),
        ]);
      }
      return await this.prisma.subject.update({
        where: { id: subjectId },
        data: { name },
        include: {
          teachers: {
            select: { teacher: true },
          },
        },
      });
    } catch (e) {
      throw new NotFoundException(`Subject with id=${subjectId} doesn't exist`);
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.subject.delete({ where: { id } });
      return { message: `Subject with id=${id} has been removed` };
    } catch {
      throw new NotFoundException(`Subject with id=${id} doesn't exist`);
    }
  }
}
