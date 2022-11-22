import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import * as R from 'rambda';
import { Utils } from 'src/utils/utils';
import { pluck } from 'rambda';
@Injectable()
export class TeacherService {
  constructor(private prisma: PrismaService, private utils: Utils) {}

  async create(createTeacherDto: CreateTeacherDto) {
    const { firstName, lastName, patronymic, subjects } = createTeacherDto;
    const { id: teacherId } = await this.prisma.teacher.create({
      data: {
        firstName,
        lastName,
        patronymic,
      },
    });
    if (subjects && subjects.length) {
      const subjectsCount = await this.prisma.subject.count({
        where: { id: { in: subjects } },
      });
      if (subjectsCount === subjects.length) {
        await this.prisma.subjectCrossTeacher.createMany({
          data: subjects.map(subjectId => ({
            teacherId,
            subjectId,
          })),
        });
      }
    }
    return this.prisma.teacher.findUnique({
      where: { id: teacherId },
      include: {
        subjects: {
          select: { subject: true },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.teacher.findMany({
      include: {
        subjects: {
          select: { subject: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const teacher = await this.prisma.teacher.findUnique({
      where: { id },
      include: {
        subjects: {
          select: { subject: true },
        },
      },
    });
    if (!teacher) {
      throw new NotFoundException(`Teacher with id=${id} doesn't exist`);
    }
    return teacher;
  }

  async update(
    teacherId: number,
    { subjects, ...updateData }: UpdateTeacherDto
  ) {
    if (subjects) {
      const [removedSubjects, addedSubjects] = this.utils.distributeItems(
        pluck(
          'subjectId',
          await this.prisma.subjectCrossTeacher.findMany({
            where: { teacherId },
          })
        ),
        subjects
      );
      await Promise.all([
        this.prisma.subjectCrossTeacher.deleteMany({
          where: { subjectId: { in: removedSubjects } },
        }),
        this.prisma.subjectCrossTeacher.createMany({
          data: addedSubjects.map(subjectId => ({ teacherId, subjectId })),
        }),
      ]);
    }
    return await this.prisma.teacher.update({
      where: { id: teacherId },
      data: updateData,
      include: {
        subjects: {
          select: {
            subject: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    try {
      await this.prisma.teacher.delete({
        where: { id },
        select: null,
      });
      return {
        message: `Teacher with id=${id} has been removed`,
      };
    } catch {
      throw new NotFoundException(`Teacher with id=${id} doesn't exist`);
    }
  }
}
